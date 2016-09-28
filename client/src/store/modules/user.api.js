import Vue from 'vue'
import { readMulti } from '../../storage'

export function init () {
  return readMulti(['user.username', 'user.access_token', 'user.refresh_token'], true)
}

export function login (username, password) {
  return Vue.http.post('auth/local', {
    username,
    password
  }).then(res => res.json())
}

export function logout () {
  return Vue.http.post('auth/logout')
}
