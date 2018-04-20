<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="./">Karabiner-Elements complex_modifications rules</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/pqrs-org/KE-complex_modifications" target="_blank">
            <icon name="external-link-alt"></icon>
            GitHub
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container" style="margin-top: 2rem; margin-bottom: 10rem;" id="main-container">
      <ul class="toc list-group">
        <li class="list-group-item list-group-item-info">Table of Contents</li>
        <li class="list-group-item" v-for="group in groups" :key="group.id" v-cloak>
          <a :href="'#' + group.id">{{ group.name }}</a>
          <span class="badge badge-pill badge-secondary float-right">{{ group.files.length }}</span>
        </li>
      </ul>

      <div style="margin-top: 1rem; margin-bottom: 3rem">
        <a href="#" @click="$('.collapse').collapse('toggle'); false;">Expand/Collapse All</a>
      </div>

      <div class="card-outer" v-for="group in groups" :key="group.id" :id="group.id" v-cloak>
        <div class="card border-info">
          <div class="card-header bg-info text-white">{{ group.name }}</div>
          <div class="card-body">
            <div v-for="file in group.files" :key="file.id">
              <div class="card-outer" v-if="file" :id="file.id">
                <div class="card">
                  <div class="card-header">
                    <a :href="'#' + file.id" @click="showDescription(file.id)"><i class="fas fa-link"></i></a>
                    <a class="btn btn-link" role="button" style="width: calc(100% - 100px); text-align: left; color: black;" data-toggle="collapse" aria-expanded="false" :aria-controls="file.id + '-list-group'" :href="'#' + file.id + '-list-group'" >{{ file.title }}</a>
                    <a class="btn btn-primary btn-sm float-right" :href="file.importUrl">Import</a>
                  </div>
                  <div class="collapse" :id="file.id + '-list-group'">
                    <div class="list-group list-group-flush">
                      <div class="list-group-item" v-for="rule in file.rules" :key="rule.id">{{ rule }}</div>
                      <div class="list-group-item" v-if="file.extraDescription" v-html="file.extraDescription"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="baseName != 'example'">
        <hr />
        <a href="example.html">Other examples</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {
      groups: [],
      fetchTotalNumber: 0,
      pageName: this.baseName(window.location.pathname)
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
    // showDescription(id) {
    //   $('#' + id + ' .collapse').collapse('show')
    // },
    fetchData() {
      const self = this

      axios
        .get('groups.json')
        .then(function(response) {
          let type = this.baseName(window.location.pathname)
          if (type === '') {
            type = 'index'
          }

          response.data[type].forEach(function(group, groupIndex) {
            let g = {
              id: group.id,
              name: group.name,
              files: []
            }
            g.files.length = group.files.length
            g.files.fill(undefined)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
