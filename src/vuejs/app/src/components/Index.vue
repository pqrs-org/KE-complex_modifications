<template>
  <div>
    <b-navbar toggleable="md"
              type="dark"
              variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="./">Karabiner-Elements complex_modifications rules</b-navbar-brand>
      <b-collapse is-nav
                  id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/pqrs-org/KE-complex_modifications"
                      target="_blank">
            <icon name="external-link-alt"></icon> GitHub
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="search">
      <socket id="loading-spinner"
              v-show="loading"></socket>

      <b-row align-h="center">
        <b-col md="6">
          <search-form @submit="search"
                       ref="searchForm"
                       :disabled="lunrIndex === null"
                       :placeholder="(lunrIndex ? 'Search keywords...' : 'Fetching data...')">
          </search-form>
        </b-col>
      </b-row>
    </div>

    <b-container>
      <b-list-group class="toc">
        <b-list-group-item variant="info">Table of Contents</b-list-group-item>

        <b-list-group-item v-for="group in filteredGroups"
                           :key="group.id"
                           v-cloak>
          <a :href="'#' + group.id">{{ group.name }}</a>
          <b-badge variant="secondary"
                   class="float-right">{{ group.files.length }}</b-badge>
        </b-list-group-item>
      </b-list-group>

      <div style="margin-top: 1rem; margin-bottom: 3rem">
        <div v-if="allFilesExpanded">
          <b-btn variant="secondary"
                 @click="setAllFileCollapsed(true)">Collapse All</b-btn>
        </div>
        <div v-else>
          <b-btn variant="secondary"
                 @click="setAllFileCollapsed(false)">Expand All</b-btn>
        </div>
      </div>

      <div class="card-outer"
           v-for="group in filteredGroups"
           :key="group.id"
           :id="group.id"
           v-cloak>
        <b-card class="border-info"
                :header="group.name"
                header-bg-variant="info"
                header-text-variant="white">
          <div v-for="file in group.files"
               :key="file.id">
            <div class="rule-card-outer"
                 v-if="file"
                 :id="file.id">
              <b-card no-body>
                <b-card-header>
                  <span class="rule-title"
                        @click="toggleFileCollapsed(file.id)">
                    <span v-if="fileCollapsed[file.id]">
                      <icon name="caret-square-right"></icon>
                    </span>
                    <span v-else>
                      <icon name="caret-square-down"></icon>
                    </span>
                    {{ file.title }}

                    <div v-if="file.maintainers"
                         class="rule-maintainer">
                      <span class="rule-maintainer-header">
                        Maintained by
                      </span>
                      <span class="rule-maintainer-body">
                        <span v-for="m in file.maintainers"
                              :key="m">
                          @<a :href="'https://github.com/' + m"
                             target="_blank">{{ m }}</a>
                        </span>
                      </span>
                    </div>
                  </span>

                  <div class="float-right">
                    <b-dropdown text="Import"
                                variant="primary"
                                split
                                right
                                @click="importJson(file.importUrl)">
                      <b-dropdown-item-button @click="importJson(file.importUrl)">Import to Karabiner-Elements</b-dropdown-item-button>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button @click="showJsonModal(file.id)">
                        <small>
                          <icon name="regular/comment-alt"></icon>
                          Show JSON
                        </small>
                      </b-dropdown-item-button>
                      <b-dropdown-item-button v-clipboard:copy="pageUrl + '#' + file.id"
                                              v-clipboard:success="urlCopied"
                                              v-clipboard:error="urlCopyFailed">
                        <small>
                          <icon name="regular/clipboard"></icon>
                          Copy URL
                        </small>
                      </b-dropdown-item-button>
                      <b-dropdown-item-button v-clipboard:copy="pageUrl + file.jsonUrl"
                                              v-clipboard:success="urlCopied"
                                              v-clipboard:error="urlCopyFailed">
                        <small>
                          <icon name="regular/clipboard"></icon>
                          Copy JSON URL
                        </small>
                      </b-dropdown-item-button>
                      <b-dropdown-item-button @click="editJson(file.id)">
                        <small>
                          <icon name="regular/edit"></icon>
                          Edit JSON (Open external site)
                        </small>
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                </b-card-header>
                <b-collapse :id="file.id + '-list-group'"
                            :visible="!fileCollapsed[file.id]">
                  <b-list-group flush>
                    <b-list-group-item v-for="rule in file.rules"
                                       :key="rule.id">
                      {{ rule.description }}
                      <div v-if="rule.availableSince"
                           class="rule-available-since">
                        Karabiner-Elements {{ rule.availableSince }} or later
                      </div>
                    </b-list-group-item>
                    <template v-if="file.extraDescriptionPath">
                      <b-list-group-item>
                        <iframe :id="file.id + '-extra-description'"
                                :src="'build/' + file.extraDescriptionPath">
                        </iframe>
                      </b-list-group-item>
                    </template>
                  </b-list-group>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </b-card>
      </div>
      <div v-if="pageName != 'example'">
        <hr />
        <a href="example.html">Other examples</a>
      </div>

      <b-modal id="show-json-modal"
               ref="showJsonModalRef"
               :title="showJsonModalTitle"
               size="lg"
               ok-only
               ok-title="Close">
        <p class="show-json-modal-body">{{ showJsonModalBody }}</p>
      </b-modal>
    </b-container>
  </div>
</template><script>
import axios from 'axios'
import lunr from 'lunr'
import { Socket } from 'vue-loading-spinner'
import VueScrollTo from 'vue-scrollto'
import SearchForm from './SearchForm.vue'
import iFrameResize from 'iframe-resizer/js/iframeResizer'

const getFileName = path => {
  let name = path.substring(path.lastIndexOf('/') + 1)
  if (name.lastIndexOf('.') != -1) {
    name = name.substring(0, name.lastIndexOf('.'))
  }
  return name
}

let scrollToHashTriggered = false

class Rule {
  constructor(ruleIndex, ruleJson) {
    this.id = ruleIndex
    this.description = ruleJson.description
    this.availableSince = ruleJson.available_since
  }
}

class File {
  constructor(fileJson) {
    this.id = getFileName(fileJson.path)
    this.jsonUrl = fileJson.path
    this.importUrl = this.makeJsonUrl(fileJson.path)
    this.extraDescriptionPath = fileJson.extra_description_path
    this.extraDescriptionText = fileJson.extra_description_text
    this.title = fileJson.json.title
    this.maintainers = fileJson.json.maintainers
    this.rules = []
    fileJson.json.rules.forEach((r, ruleIndex) => {
      this.rules.push(new Rule(ruleIndex, r))
    })
  }

  makeJsonUrl(path) {
    const url = encodeURIComponent(
      window.location.href.replace(/[^/]+$/, '') + path
    )
    return (
      'karabiner://karabiner/assets/complex_modifications/import?url=' + url
    )
  }
}

class Group {
  constructor(groupJson) {
    this.id = groupJson.id
    this.name = groupJson.name
    this.files = []

    groupJson.files.forEach(fileJson => {
      this.files.push(new File(fileJson))
    })
  }
}

export default {
  name: 'Index',
  components: {
    Socket,
    SearchForm
  },
  data() {
    return {
      loading: true,
      pageUrl: window.location.origin + window.location.pathname,
      pageName: this.fileName(window.location.pathname),
      groups: [],
      filteredGroups: [],
      allFilesExpanded: false,
      fileCollapsed: {},
      showJsonModalTitle: '',
      showJsonModalBody: '',
      lunrIndex: null,
      iFrameResizers: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fileName(path) {
      let base = path.substring(path.lastIndexOf('/') + 1)
      if (base.lastIndexOf('.') != -1) {
        base = base.substring(0, base.lastIndexOf('.'))
      }
      return base
    },

    urlSearchQuery() {
      return new URLSearchParams(location.search).get('q')
    },

    fetchData() {
      axios
        .get('build/dist.json', {
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        .then(response => {
          let type = this.fileName(window.location.pathname)
          if (type === '') {
            type = 'index'
          }

          response.data[type].forEach(groupJson => {
            this.groups.push(new Group(groupJson))
          })

          this.filteredGroups = this.groups

          this.updateLoadingState()
          this.makeLunrIndex()
          this.makeIFrameResizer()
          this.setAllFileCollapsed(true)
          this.scrollToHash()

          const q = this.urlSearchQuery()
          if (q !== null) {
            this.$refs.searchForm.setSearchQuery(q)
          }
        })
    },

    updateLoadingState() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },

    makeLunrIndex() {
      this.lunrIndex = lunr(l => {
        l.ref('fileId')
        l.field('title', { boost: 2 })
        l.field('text')

        this.groups.forEach(g => {
          g.files.forEach(f => {
            let text = ''
            if (f.maintainers !== undefined) {
              f.maintainers.forEach(m => {
                text += m + ' '
              })
            }
            f.rules.forEach(r => {
              text += r.description + ' '
            })
            text += f.extraDescriptionText + ' '

            l.add({
              fileId: f.id,
              title: f.title,
              text: text.toLowerCase()
            })
          })
        })
      })
    },

    updateAllFilesExpanded() {
      this.allFilesExpanded = true
      for (let v of Object.values(this.fileCollapsed)) {
        if (v) {
          this.allFilesExpanded = false
          return
        }
      }
    },

    setAllFileCollapsed(value) {
      let fileCollapsed = {}

      this.groups.forEach(g => {
        g.files.forEach(f => {
          fileCollapsed[f.id] = value

          this.makeIFrameResizer(f.id)
        })
      })

      this.fileCollapsed = fileCollapsed

      this.updateAllFilesExpanded()
    },

    toggleFileCollapsed(fileId) {
      const currentValue = this.fileCollapsed[fileId]
      this.$set(this.fileCollapsed, fileId, !currentValue)

      this.makeIFrameResizer(fileId)

      this.updateAllFilesExpanded()
    },

    makeIFrameResizer(fileId) {
      this.iFrameResizers[fileId] = iFrameResize(
        {
          heightCalculationMethod: 'lowestElement'
        },
        '#' + fileId + '-extra-description'
      )
    },

    importJson(url) {
      location.href = url
    },

    showJsonModal(fileId) {
      for (let g of this.groups) {
        for (let f of g.files) {
          if (f.id == fileId) {
            this.showJsonModalTitle = f.title
            this.showJsonModalBody = 'Loading...'
            this.$refs.showJsonModalRef.show()

            axios.get(f.jsonUrl).then(response => {
              this.showJsonModalBody = JSON.stringify(response.data, null, 2)
            })

            return
          }
        }
      }
    },
    editJson(fileId) {
      for (let g of this.groups) {
        for (let f of g.files) {
          if (f.id == fileId) {
            axios.get(f.jsonUrl).then(response => {
              const url =
                'https://genesy.github.io/karabiner-complex-rules-generator/#'
              const base64string = window.btoa(JSON.stringify(response.data))
              window.open(url + base64string)
            })

            return
          }
        }
      }
    },

    urlCopied(e) {
      alert('You just copied: ' + e.text)
    },

    urlCopyFailed() {
      alert('Failed to copy texts')
    },

    scrollToHash() {
      if (scrollToHashTriggered) {
        return
      }

      setTimeout(() => {
        const elementId = window.location.hash.substring(1)
        const element = document.getElementById(elementId)
        if (!element) {
          return
        }

        scrollToHashTriggered = true
        this.$set(this.fileCollapsed, elementId, false)
        this.makeIFrameResizer(elementId)
        VueScrollTo.scrollTo(element, 500, {
          offset: -100
        })
      }, 500)
    },

    search(searchQuery) {
      //
      // Set history
      //

      if (searchQuery !== this.urlSearchQuery()) {
        window.history.pushState(
          { q: searchQuery },
          '',
          '?q=' + encodeURIComponent(searchQuery)
        )
      }

      //
      // Search
      //

      if (this.lunrIndex === null) {
        return
      }

      if (!searchQuery) {
        this.filteredGroups = this.groups
        return
      }

      const group = new Group({
        id: 'search-result',
        name: 'Search Result',
        files: []
      })
      let filteredGroups = [group]

      const results = this.lunrIndex.query(q => {
        lunr.tokenizer(searchQuery.toLowerCase()).forEach(token => {
          const queryString = token.toString()
          q.term(queryString, {
            boost: 100
          })
          q.term(queryString, {
            wildcard:
              lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
            boost: 10
          })
          q.term(queryString, {
            editDistance: 2
          })
        })
      })

      results.forEach(r => {
        const fileId = r.ref

        this.groups.forEach(g => {
          g.files.forEach(f => {
            if (f.id == fileId) {
              group.files.push(f)
            }
          })
        })
      })

      this.filteredGroups = filteredGroups

      window.scrollTo(0, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search {
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  z-index: 900;
  background-color: #343a40;

  #loading-spinner {
    position: absolute;
    top: 2px;
    left: 2px;
  }
}

.container {
  margin-bottom: 10rem;

  .toc {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .card-outer {
    .rule-card-outer {
      margin-bottom: 1rem;

      .rule-title {
        display: inline-block;
        cursor: pointer;
        width: calc(100% - 150px);
        text-align: left;

        &:hover {
          text-decoration: underline;
        }

        .rule-maintainer {
          display: block;
          float: right;
          border-width: 1px;
          border-style: solid;
          border-color: gray;
          border-radius: 5px;
          padding: 0 3px 0 3px;

          .rule-maintainer-header {
            font-size: 12px;
          }

          .rule-maintainer-body {
            font-size: 14px;
          }
        }
      }

      .rule-available-since {
        display: block;
        float: right;
        border-width: 1px;
        border-style: solid;
        border-color: gray;
        border-radius: 5px;
        padding: 0 3px 0 3px;
        font-size: 14px;
      }

      iframe {
        width: 1px;
        min-width: 100%;
        border: none;
      }
    }
  }
}

.show-json-modal-body {
  white-space: pre-wrap;
  height: 50vh;
  overflow: auto;
}
</style>
