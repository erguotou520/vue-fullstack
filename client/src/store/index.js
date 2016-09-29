import Vue from 'vue'
import Vuex from 'vuex'
import routeLoading from './modules/route'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    routeLoading
  }
})
