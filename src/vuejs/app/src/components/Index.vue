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

    <b-container>
      <b-list-group class="toc">
        <b-list-group-item variant="info">Table of Contents</b-list-group-item>

        <b-list-group-item v-for="group in groups"
                           :key="group.id"
                           v-cloak>
          <a :href="'#' + group.id">{{ group.name }}</a>
          <b-badge variant="secondary"
                   class="float-right">{{ group.files.length }}</b-badge>
        </b-list-group-item>
      </b-list-group>
      <div style="margin-top: 1rem; margin-bottom: 3rem">
        <div v-if="allRulesVisible">
          <b-btn variant="secondary"
                 @click="setAllRuleVisibilities(false)">Collapse All</b-btn>
        </div>
        <div v-else>
          <b-btn variant="secondary"
                 @click="setAllRuleVisibilities(true)">Expand All</b-btn>
        </div>
      </div>
      <div class="card-outer"
           v-for="group in groups"
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
                        v-b-toggle="file.id + '-list-group'">{{ file.title }}</span>

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
                            :visible="ruleVisibilities[file.id]"
                            @shown="setRuleVisibility(file.id, true)"
                            @hidden="setRuleVisibility(file.id, false)">
                  <div class="list-group list-group-flush">
                    <div class="list-group-item"
                         v-for="rule in file.rules"
                         :key="rule.id">{{ rule.description }}</div>
                    <div class="list-group-item"
                         v-if="file.extraDescription"
                         v-html="file.extraDescription"></div>
                  </div>
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

let fileNames = {}
let jsonBodies = {}

export default {
  name: 'Index',
  data() {
    return {
      pageUrl: window.location.origin + window.location.pathname,
      groups: [],
      allRulesVisible: false,
      ruleVisibilities: {},
      fetchTotalNumber: 0,
      fetchedCount: 0,
      pageName: this.baseName(window.location.pathname),
      showJsonModalTitle: '',
      showJsonModalBody: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    baseName(path) {
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
          let type = self.baseName(window.location.pathname)
          if (type === '') {
            type = 'index'
          }

          response.data[type].forEach(function(group, groupIndex) {
            let g = {
              id: group.id,
              name: group.name,
              files: []
            }

            for (let i = 0; i < group.files.length; ++i) {
              g.files.push({ id: null })
            }
            self.groups.push(g)

            group.files.forEach(function(file, fileIndex) {
              if (file.path) {
                ++self.fetchTotalNumber
                self.fetchFile(file.path, groupIndex, fileIndex)
              }
              if (file.extra_description_path) {
                ++self.fetchTotalNumber
                self.fetchExtraDescription(
                  file.extra_description_path,
                  groupIndex,
                  fileIndex
                )
              }
            })
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
          ++self.fetchedCount

          let f = self.groups[groupIndex].files[fileIndex]
          if (f.id === null) {
            f.id = 'file-' + groupIndex + '-' + fileIndex
            f.title = response.data.title
            f.importUrl = self.jsonUrl(path)
            f.rules = []
          }

          self.$set(self.ruleVisibilities, f.id, false)
          fileNames[f.id] = self.baseName(path)
          jsonBodies[f.id] = JSON.stringify(response.data, null, 2)

          response.data.rules.forEach(function(r) {
            f.rules.push({
              id: 'rule-' + groupIndex + '-' + fileIndex + '-' + f.rules.length,
              description: r.description
            })
          })
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
          ++self.fetchedCount

          let f = self.groups[groupIndex].files[fileIndex]
          f.extraDescription = response.data

          self.$set(self.groups[groupIndex].files, fileIndex, f)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    updateAllRulesVisible() {
      this.allRulesVisible = true
      for (const v of Object.values(this.ruleVisibilities)) {
        if (!v) {
          this.allRulesVisible = false
          return
        }
      }
    },

    setAllRuleVisibilities(value) {
      let ruleVisibilities = {}
      for (const id of Object.keys(this.ruleVisibilities)) {
        ruleVisibilities[id] = value
      }
      this.ruleVisibilities = ruleVisibilities

      this.updateAllRulesVisible()
    },

    setRuleVisibility(id, value) {
      this.$set(this.ruleVisibilities, id, value)

      this.updateAllRulesVisible()
    },

    importJson(url) {
      location.href = url
    },

    showJsonModal(fileId) {
      this.showJsonModalTitle = fileNames[fileId]
      this.showJsonModalBody = jsonBodies[fileId]
      this.$refs.showJsonModalRef.show()
    },

    urlCopied: function(e) {
      alert('You just copied: ' + e.text)
    },

    urlCopyFailed: function(e) {
      alert('Failed to copy texts')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  margin-bottom: 10rem;

  .toc {
    margin-top: 2rem;
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
