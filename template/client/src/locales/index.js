import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { merge } from 'lodash'
import { lang } from '../stored'

import zhCN from './zh-CN'
import en from './en'
import eleZhCN from 'element-ui/lib/locale/lang/zh-CN'
import eleEn from 'element-ui/lib/locale/lang/en'

const locales = {
  'zh-CN': merge(zhCN, eleZhCN),
  en: merge(en, eleEn)
}

Vue.use(VueI18n)

Vue.config.lang = lang
Vue.config.fallbackLang = 'zh-CN'

// set locales
Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})
