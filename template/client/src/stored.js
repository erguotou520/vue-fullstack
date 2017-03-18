import { read } from './storage'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN,
  STORE_KEY_CONFIG_LANG, STORE_KEY_CONFIG_PAGE_LIMIT } from './constants'

export const username = read(STORE_KEY_USERNAME) || ''
// eslint-disable-next-line camelcase
export const access_token = read(STORE_KEY_ACCESS_TOKEN) || '' // eslint-disable-line
// eslint-disable-next-line camelcase
export const refresh_token = read(STORE_KEY_REFRESH_TOKEN) || '' // eslint-disable-line
// lang order: localStorage -> browser language -> default
export const lang = read(STORE_KEY_CONFIG_LANG) || navigator.language || 'zh-CN'
export const pageLimit = +read(STORE_KEY_CONFIG_PAGE_LIMIT) || 20
