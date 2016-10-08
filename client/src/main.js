import Vue from 'vue'
// router and store
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)

// locale
import './locale'

// ajax
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'
Vue.http.interceptors.push((request, next) => {
  // if logged in, add the token to the header
  if (store.getters.loggedIn) {
    request.headers.set('Authorization', `Bearer ${store.getters.accessToken}`)
  }
  next()
})
// response interceptor
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && store.state.route.path !== '/login') {
      store.dispatch('logout').then(() => {
        router.push({ path: '/login', query: { redirect: store.state.route.fullpath }})
      })
      return
    }
  })
})

// ui library
import Element from 'element-ui'
Vue.use(Element)

// main component
import App from './App'

const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
})
// actually mount to DOM
app.$mount('app')
