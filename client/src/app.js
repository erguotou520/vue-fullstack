import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
import NProgress from 'vue-nprogress'

Vue.use(VueResource)
Vue.http.options.root = '/api'
// request interceptor, add token to headers
Vue.http.interceptors.push((request, next) => {
  if (store.getters.loggedIn) {
    request.headers.set('Authorization', `Bearer ${store.getters.accessToken}`)
  }
  next()
})
// response interceptor
// Vue.http.interceptors.push((request, next) => {
//   next((response) => {
//     if (response.ok) {
//       return response.json()
//     } else {
//       return response
//     }
//   })
// })
Vue.use(Element)
Vue.use(NProgress)
const nprogress = new NProgress({ parent: '.nprogress-container' })

const app = new Vue({
  router,
  store,
  nprogress,
  ...App // Object spread copying everything from App.vue
})
// actually mount to DOM
app.$mount('app')
