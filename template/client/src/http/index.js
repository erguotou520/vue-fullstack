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
    if (response.status === 401 && store.state.route.path !== '/login') {
      store.dispatch('logout').then(() => {
        router.push({ path: '/login', query: { redirect: store.state.route.fullpath }})
      })
      return
    }
    if (response.status === 404) {
      Message.error('请求地址有误')
      return
    }
    if (response.status === 500) {
      Message.error('后台出错')
      return
    }
    // other errors
    if (!response.ok) {
      response.json().then(data => {
        Message.error({
          message: data.message || '操作失败，请重试'
        })
      }).catch(() => {
        Message.error({
          message: response || '操作失败，请重试'
        })
      })
    }
  })
})
