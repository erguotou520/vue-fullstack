import Vue from 'vue'
import { authSocket } from '../../socket'

export function login (username, password) {
  return Vue.http.post('auth/local', {
    username,
    password
  }).then(res => res.json())
}

export function getUserInfo (token) {
  return new Promise((resolve) => {
    Vue.http.get('users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(data => data.json()).then(data => {
      authSocket(token, () => {
        console.log('Token authenticated.')
      })
      resolve(data)
    }).catch(() => {
      resolve({})
    })
  })
}
