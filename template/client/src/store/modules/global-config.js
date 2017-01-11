{{#if i18n}}import Vue from 'vue'{{/if}}
import { {{#if i18n}}lang, {{/if}}pageLimit } from '../../stored'
import { save } from '../../storage'
import { {{#if i18n}}STORE_KEY_CONFIG_LANG, {{/if}}STORE_KEY_CONFIG_PAGE_LIMIT } from '../../constants'

const state = {
  {{#if i18n}}lang: lang,
  // value see http://stackoverflow.com/questions/5580876/navigator-language-list-of-all-languages
  langs: [{
    label: '中文',
    value: 'zh-CN'
  }, {
    label: 'English',
    value: 'en'
  }],
  {{/if}}pageLimit: pageLimit
}

const mutations = {
  UPDATE (state, config) {
    {{#if i18n}}state.lang = config.lang || state.lang
    {{/if}}state.pageLimit = config.pageLimit || state.pageLimit
  }{{#if i18n}},
  UPDATE_LANG (state, lang) {
    state.lang = lang || state.lang
  }{{/if}}
}

const actions = {
  {{#if i18n}}changeLang ({ commit }, lang) {
    Vue.config.lang = lang
    commit('UPDATE_LANG', lang)
    save(STORE_KEY_CONFIG_LANG, lang)
  },
  {{/if}}updateGlobalConfig ({ commit, state, dispatch }, config) {
    {{#if i18n}}if (config.lang !== state.lang) {
      Vue.config.lang = config.lang
      save(STORE_KEY_CONFIG_LANG, config.lang)
    }
    {{/if}}commit('UPDATE', config)
    {{#if i18n}}save(STORE_KEY_CONFIG_LANG, state.lang)
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
