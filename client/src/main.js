import Vue from 'vue'
// router and store
import store, { initStore } from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

// locale
import './locale'

// ui library
import Element from 'element-ui'
Vue.use(Element)

// ajax
import './http'

// init store data
initStore()

// main component
import App from './App'

import './socket'

const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
})
// actually mount to DOM
app.$mount('#app')
