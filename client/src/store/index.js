import Vue from 'vue'
import Vuex from 'vuex'
import locale from './modules/locale'
import routeLoading from './modules/route'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    locale,
    user,
    routeLoading
  }
})

export default store
export function initStore () {
  store.dispatch('initUserInfo')
}
