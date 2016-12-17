import Vue from 'vue'
import store from '../store'
import router from '../router'
import VueResource from 'vue-resource'
import { Message } from 'element-ui'
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true
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
    // don't handle for login page
    if (store.state.route.path === '/login') {
      return
    }
    if (response.status === 401) {
      store.dispatch('logout').then(() => {
        router.push({ path: '/login', query: { redirect: store.state.route.fullpath }})
      })
      return
    }
    if (response.status === 404) {
      Message.error(Vue.t('http.error.E404'))
      return
    }
    if (response.status === 500) {
      Message.error(Vue.t('http.error.E500'))
      return
    }
    // other errors
    if (!response.ok) {
      response.json().then(data => {
        Message.error({
          message: data.message || Vue.t('http.error.E404')
        })
      }).catch(() => {
        Message.error({
          message: response || Vue.t('http.error.E404')
        })
      })
    }
  })
})
