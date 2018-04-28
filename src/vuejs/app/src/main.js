import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import VueClipboard from 'vue-clipboard2'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.component('icon', Icon)

new Vue({
  render: h => h(App)
}).$mount('#app')
