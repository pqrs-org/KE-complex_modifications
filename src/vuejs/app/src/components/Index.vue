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
          <b-form @submit="search">
            <b-input-group>
              <b-form-input v-model="searchQuery"
                            :disabled="lunrIndex === null"
                            :placeholder="(lunrIndex ? 'Search keywords...' : 'Fetching data...')">
              </b-form-input>
              <b-input-group-append>
                <b-btn type="submit"
                       variant="primary">Search</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form>
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
                        <small>Show json</small>
                      </b-dropdown-item-button>
                      <b-dropdown-item-button v-clipboard:copy="pageUrl + '#' + file.id"
                                              v-clipboard:success="urlCopied"
                                              v-clipboard:error="urlCopyFailed">
                        <small>Copy URL</small>
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
                    </b-list-group-item>
                    <b-list-group-item v-if="file.extraDescription"
                                       v-html="file.extraDescription">
                    </b-list-group-item>
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
import striptags from 'striptags'
import { Socket } from 'vue-loading-spinner'
import VueScrollTo from 'vue-scrollto'

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
  }
}

class File {
  constructor(fileJson) {
    this.id = getFileName(fileJson.path)
    this.jsonUrl = fileJson.path
    this.importUrl = this.makeJsonUrl(fileJson.path)
    this.extraDescription = fileJson.extra_description
    this.title = fileJson.json.title
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
    Socket
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
      searchQuery: '',
      lunrIndex: null
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

    fetchData() {
      axios
        .get('dist.json', {
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
          this.setAllFileCollapsed(true)
          this.scrollToHash()
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
        l.field('text')

        this.groups.forEach(g => {
          g.files.forEach(f => {
            let text = f.title + ' '
            f.rules.forEach(r => {
              text += r.description + ' '
            })
            text += striptags(f.extraDescription) + ' '

            l.add({
              fileId: f.id,
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
        })
      })

      this.fileCollapsed = fileCollapsed

      this.updateAllFilesExpanded()
    },

    toggleFileCollapsed(fileId) {
      const currentValue = this.fileCollapsed[fileId]
      this.$set(this.fileCollapsed, fileId, !currentValue)

      this.updateAllFilesExpanded()
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
        VueScrollTo.scrollTo(element, 500, {
          offset: -100
        })
      }, 500)
    },

    search(e) {
      e.preventDefault()

      if (this.lunrIndex === null) {
        return
      }

      if (!this.searchQuery) {
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
        lunr.tokenizer(this.searchQuery.toLowerCase()).forEach(token => {
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
      }
    }
  }

  .show-json-modal-body {
    white-space: pre-wrap;
    height: 50vh;
    overflow: auto;
  }
}
</style>
