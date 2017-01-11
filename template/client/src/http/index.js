import Vue from 'vue'
import store from '../store'
import router from '../router'
import VueResource from 'vue-resource'
import { Message } from 'element-ui'
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true
Vue.http.options.root = '/api'

const requestMap = {}

// response interceptor
Vue.http.interceptors.push((request, next) => {
  let key
  // abort the same post request
  if (/POST|PUT|DELETE/.test(request.method)) {
    key = `${request.method}${request.url}${JSON.stringify(request.body)}`
    // abort the existed request
    if (key && requestMap[key]) {
      key = null
      setTimeout(() => {
        request.abort()
      })
    } else {
      requestMap[key] = request
    }
  }

  if (store.getters.loggedIn) {
    // if logged in, add the token to the header
    request.headers.set('Authorization', `Bearer ${store.getters.accessToken}`)
  }
  next((response) => {
    // delete current request in the map
    if (key) {
      delete requestMap[key]
    }
    // don't handler for login page
    if (store.state.route.path === '/login') {
      return
    }
    if (response.status === 401) {
      Message.error(Vue.t('http.error.E401'))
      store.dispatch('logout').then(() => {
        const location = window.location
        const path = store.state.route.fullpath || (location.pathname + location.search)
        router.push({ path: '/login', query: { redirect: path }})
      })
      return
    }
    if (response.status === 403) {
      Message.error(Vue.t('http.error.E403'))
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
      Message.error({
        message: response.data || Vue.t('http.error.others')
      })
    }
  })
})
