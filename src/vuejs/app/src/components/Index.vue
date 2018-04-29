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
                 @click="setAllFileCollapsed(false)">Collapse All</b-btn>
        </div>
        <div v-else>
          <b-btn variant="secondary"
                 @click="setAllFileCollapsed(true)">Expand All</b-btn>
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
                            :visible="fileCollapsed[file.id]">
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
const VueScrollTo = require('vue-scrollto')

let fileNames = {}
let jsonBodies = {}
let scrollToHashTriggered = false

class Rule {
  constructor(ruleId, description) {
    this.id = ruleId
    this.description = description
  }
}

class File {
  constructor(fileId, title) {
    this.id = fileId
    this.title = title
    this.importUrl = null
    this.rules = []
    this.extraDescription = null
  }
}

class Group {
  constructor(groupId, name) {
    this.id = groupId
    this.name = name
    this.files = []
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
      const self = this

      axios
        .get('groups.json')
        .then(function(response) {
          let type = self.fileName(window.location.pathname)
          if (type === '') {
            type = 'index'
          }

          response.data[type].forEach(function(group, groupIndex) {
            const g = new Group(group.id, group.name)

            for (let i = 0; i < group.files.length; ++i) {
              g.files.push(new File(null, null))
            }
            self.groups.push(g)

            group.files.forEach(function(file, fileIndex) {
              if (file.path) {
                self.fetchFile(file.path, groupIndex, fileIndex)
              }
              if (file.extra_description_path) {
                self.fetchExtraDescription(
                  file.extra_description_path,
                  groupIndex,
                  fileIndex
                )
              } else {
                g.files[fileIndex].extraDescription = ''
              }
            })

            self.filteredGroups = self.groups
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    jsonUrl(path) {
      const url = encodeURIComponent(
        window.location.href.replace(/[^/]+$/, '') + path
      )
      return (
        'karabiner://karabiner/assets/complex_modifications/import?url=' + url
      )
    },

    fetchFile(path, groupIndex, fileIndex) {
      const self = this

      axios
        .get(path)
        .then(function(response) {
          let f = self.groups[groupIndex].files[fileIndex]
          if (f.id === null) {
            f.id = self.fileName(path)
            f.title = response.data.title
            f.importUrl = self.jsonUrl(path)
          }

          self.$set(
            self.fileCollapsed,
            f.id,
            window.location.hash.substring(1) == f.id
          )
          fileNames[f.id] = self.fileName(path)
          jsonBodies[f.id] = JSON.stringify(response.data, null, 2)

          response.data.rules.forEach(function(r, ruleIndex) {
            f.rules.push(new Rule(f.id + '-rule-' + ruleIndex, r.description))
          })

          self.filteredGroups = self.groups
          self.updateLoadingState()
          self.makeLunrIndex(groupIndex, fileIndex)
          self.scrollToHash()
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    fetchExtraDescription(path, groupIndex, fileIndex) {
      const self = this

      axios
        .get(path)
        .then(function(response) {
          let f = self.groups[groupIndex].files[fileIndex]
          f.extraDescription = response.data

          self.$set(self.groups[groupIndex].files, fileIndex, f)

          self.filteredGroups = self.groups
          self.updateLoadingState()
          self.makeLunrIndex(groupIndex, fileIndex)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    allFilesFetched() {
      for (const g of this.groups) {
        for (const f of g.files) {
          if (f.id === null) {
            return false
          }
          if (f.extraDescription === null) {
            return false
          }
        }
      }

      return true
    },

    updateLoadingState() {
      if (!this.allFilesFetched()) {
        return
      }

      const self = this
      setTimeout(() => {
        self.loading = false
      }, 500)
    },

    makeLunrIndex() {
      if (!this.allFilesFetched()) {
        return
      }

      const self = this

      this.lunrIndex = lunr(function() {
        this.ref('fileId')
        this.field('text')

        for (const g of self.groups) {
          for (const f of g.files) {
            let text = f.title + ' '
            for (const r of f.rules) {
              text += r.description + ' '
            }
            text += striptags(f.extraDescription) + ' '

            this.add({
              fileId: f.id,
              text: text
            })
          }
        }
      })
    },

    updateAllFilesExpanded() {
      this.allFilesExpanded = true
      for (const v of Object.values(this.fileCollapsed)) {
        if (!v) {
          this.allFilesExpanded = false
          return
        }
      }
    },

    setAllFileCollapsed(value) {
      let fileCollapsed = {}
      for (const id of Object.keys(this.fileCollapsed)) {
        fileCollapsed[id] = value
      }
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
      this.showJsonModalTitle = fileNames[fileId]
      this.showJsonModalBody = jsonBodies[fileId]
      this.$refs.showJsonModalRef.show()
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

      const element = document.getElementById(window.location.hash.substring(1))
      if (!element) {
        return
      }

      if (!this.allFilesFetched()) {
        return
      }

      scrollToHashTriggered = true
      VueScrollTo.scrollTo(element)
    },

    search(e) {
      e.preventDefault()

      if (!this.searchQuery) {
        return
      }

      if (this.lunrIndex === null) {
        return
      }

      const group = new Group('search-result', 'Search Result')
      let filteredGroups = [group]

      for (const r of this.lunrIndex.search(this.searchQuery)) {
        const fileId = r.ref

        for (const g of this.groups) {
          for (const f of g.files) {
            if (f.id == fileId) {
              group.files.push(f)
            }
          }
        }
      }

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

  .show-json-modal-body {
    white-space: pre-wrap;
    height: 50vh;
    overflow: auto;
  }
}
</style>
