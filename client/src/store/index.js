import Vue from 'vue'
import Vuex from 'vuex'
import locale from './modules/locale'
import routeLoading from './modules/route'
import config from './modules/global-config'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    locale,
    user,
    config,
    routeLoading
  }
})

export default store
