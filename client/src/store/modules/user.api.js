import Vue from 'vue'
import { readMulti } from '../../storage'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN } from '../../constants'

export function init () {
  const stored = readMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN])
  let userInfo
  if (stored[1]) {
    Vue.http.get('me').then(data => data.json).then(data => {
      userInfo = data
    }).catch(() => {
      userInfo = {}
    })
  } else {
    userInfo = {}
  }
  return { stored, userInfo }
}

export function login (username, password) {
  return Vue.http.post('auth/local', {
    username,
    password
  }).then(res => res.json())
}
