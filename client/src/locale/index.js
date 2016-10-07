import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import store from '../store'
Vue.use(VueI18n)

import zh from './zh_CN'
Vue.config.lang = 'zh_CN'
Vue.locale('zh_CN', zh)
// store.dispatch('setupLocale')
