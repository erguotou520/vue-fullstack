import { read, save } from '../../storage'
import { STORE_KEY_CONFIG_LOCALE, STORE_KEY_CONFIG_PAGE_LIMIT } from '../../constants'

const state = {
  locale: 'zh_CN',
  pageLimit: 20
}

const mutations = {
  UPDATE (state, config) {
    state.locale = config.locale || state.locale
    state.pageLimit = config.pageLimit || state.pageLimit
  }
}

const actions = {
  initGlobalConfig ({ commit }) {
    commit('UPDATE', {
      locale: read(STORE_KEY_CONFIG_LOCALE),
      pageLimit: +read(STORE_KEY_CONFIG_PAGE_LIMIT)
    })
  },
  updateGlobalConfig ({ commit, state }, config) {
    commit('UPDATE', config)
    save(STORE_KEY_CONFIG_LOCALE, state.locale)
    save(STORE_KEY_CONFIG_PAGE_LIMIT, state.pageLimit)
  }
}

const getters = {
  globalConfig (state) {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
