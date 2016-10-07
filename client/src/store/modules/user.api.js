import Vue from 'vue'
import { read, readMulti, clearMulti } from '../../storage'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN, STORE_KEY_EXPIRES } from '../../constants'

export function init () {
  const time = new Date().getTime()
  const storedTime = +read(STORE_KEY_EXPIRES)
  if (storedTime && time > storedTime) {
    clearMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN])
    return ['', '', '']
  }
  return readMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN])
}

export function login (username, password) {
  return Vue.http.post('auth/local', {
    username,
    password
  }).then(res => res.json())
}
