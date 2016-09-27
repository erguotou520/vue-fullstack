import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'

Vue.use(VueResource)
Vue.http.options.root = '/api'
Vue.use(Element)
const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
})
// actually mount to DOM
app.$mount('app')
