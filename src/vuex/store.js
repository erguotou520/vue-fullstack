/**
 * @file App single store
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import cart from './modules/cart'
import products from './modules/products'

export default new Vuex.Store({
  // combine sub modules
  modules: {
    cart,
    products
  }
})
