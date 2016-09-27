import Vue from 'vue'
import { readMulti } from '../../storage'

export function init () {
  return readMulti(['user.username', 'user.access_token', 'user.refresh_token'], true)
}

export function login (username, password) {
  return Vue.http.post('auth/local', {
    username,
    password
  })
}
