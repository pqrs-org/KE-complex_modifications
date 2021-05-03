import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import VueClipboard from 'vue-clipboard2'

import 'vue-awesome/icons/caret-square-down'
import 'vue-awesome/icons/caret-square-right'
import 'vue-awesome/icons/regular/clipboard'
import 'vue-awesome/icons/regular/comment-alt'
import 'vue-awesome/icons/regular/edit'
import 'vue-awesome/icons/external-link-alt'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.component('icon', Icon)

new Vue({
  render: h => h(App)
}).$mount('#app')
