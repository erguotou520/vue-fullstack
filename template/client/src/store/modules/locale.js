import Vue from 'vue'
import { save, read } from '../../storage'
const state = {
  lang: 'zh_CN'
}

const mutations = {
  CHANGE_LOCALE (state, lang) {
    state.lang = lang
  }
}

const actions = {
  changeLocale ({ commit }, lang, saveConfig = true) {
    commit('CHANGE_LOCALE', lang)
    Vue.config.lang = lang
    require([`../../locale/${lang}.js`], (langConfig) => {
      Vue.locale(lang, langConfig)
      if (saveConfig) {
        save('locale.lang', lang)
      }
    })
  },
  setupLocale ({ dispatch }) {
    const lang = read('locale.lang') || 'zh_CN'
    dispatch('changeLocale', lang, false)
  }
}

const getters = {
  currentLocale (state) {
    return state.lang
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
