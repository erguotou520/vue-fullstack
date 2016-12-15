import Vue from 'vue'
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
  updateLocale ({ commit }, lang) {
    require([`../../locale/${lang}.js`], (langConfig) => {
      Vue.locale(lang, langConfig.default)
      Vue.config.lang = lang
      save(STORE_KEY_CONFIG_LOCALE, lang)
    })
  },
  initGlobalConfig ({ commit, dispatch, state }) {
    commit('UPDATE', {
      locale: read(STORE_KEY_CONFIG_LOCALE),
      pageLimit: +read(STORE_KEY_CONFIG_PAGE_LIMIT)
    })
    if (state.locale !== 'zh_CN') {
      dispatch('updateLocale', state.locale)
    }
  },
  updateGlobalConfig ({ commit, state, dispatch }, config) {
    if (config.locale !== state.locale) {
      dispatch('updateLocale', config.locale)
    }
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
