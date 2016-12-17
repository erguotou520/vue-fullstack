{{#if i18n}}import Vue from 'vue'
{{/if}}import { read, save } from '../../storage'
import { {{#if i18n}}STORE_KEY_CONFIG_LOCALE, {{/if}}STORE_KEY_CONFIG_PAGE_LIMIT } from '../../constants'

const state = {
  {{#if i18n}}locale: 'zh_CN',
  {{/if}}pageLimit: 20
}

const mutations = {
  UPDATE (state, config) {
    {{#if i18n}}state.locale = config.locale || state.locale
    {{/if}}state.pageLimit = config.pageLimit || state.pageLimit
  }
}

const actions = {
  {{#if i18n}}updateLocale ({ commit }, lang) {
    require([`../../locale/${lang}.js`], (langConfig) => {
      Vue.locale(lang, langConfig.default)
      Vue.config.lang = lang
      save(STORE_KEY_CONFIG_LOCALE, lang)
    })
  },
  {{/if}}initGlobalConfig ({ commit, dispatch, state }) {
    commit('UPDATE', {
      {{#if i18n}}locale: read(STORE_KEY_CONFIG_LOCALE),
      {{/if}}pageLimit: +read(STORE_KEY_CONFIG_PAGE_LIMIT)
    }){{#if i18n}}
    if (state.locale !== 'zh_CN') {
      dispatch('updateLocale', state.locale)
    }{{/if}}
  },
  updateGlobalConfig ({ commit, state, dispatch }, config) {
    {{#if i18n}}if (config.locale !== state.locale) {
      dispatch('updateLocale', config.locale)
    }
    {{/if}}commit('UPDATE', config)
    {{#if i18n}}save(STORE_KEY_CONFIG_LOCALE, state.locale)
    {{/if}}save(STORE_KEY_CONFIG_PAGE_LIMIT, state.pageLimit)
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
