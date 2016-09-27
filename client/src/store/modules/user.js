import { changeStorage, saveMulti, clearMulti } from '../../storage'
import { init, login } from './user.api'

const stored = init()

const state = {
  username: stored[0] || '',
  access_token: stored[1] || '',
  refresh_token: stored[2] || ''
}

const mutations = {
  // after login
  LOGIN (state, payload) {
    state.username = payload.username
    state.access_token = payload.access_token
    state.refresh_token = payload.refresh_token
  },
  // update stored token
  UPDATE_TOKEN (state, payload) {
    state.access_token = payload.access_token
    state.refresh_token = payload.refresh_token
  },
  // after logout
  LOGOUT (state) {
    state.username = ''
    state.access_token = ''
    state.refresh_token = ''
  }
}

const actions = {
  // login action
  LOGIN ({ commit }, payload) {
    return login(payload.username, payload.password).then(data => {
      changeStorage(payload.remberme ? 'localStorage' : 'sessionStorage')
      commit('LOGIN', {
        username: payload.username,
        access_token: data.data.token,
        refresh_token: ''
      })
      saveMulti([{
        key: 'user.username',
        value: payload.username
      }, {
        key: 'user.access_token',
        value: data.data.token
      }, {
        key: 'user.refresh_token',
        value: ''
      }])
      return data
    })
  },
  // refresh token action
  REFERE_TOKEN ({ commit }, payload) {
    commit('REFERE_TOKEN')
    saveMulti[{
      key: 'user.access_token',
      value: payload.access_token
    }, {
      key: 'user.refresh_token',
      value: payload.refresh_token
    }]
  },
  // logout action
  LOGOUT ({ commit }, payload) {
    commit('LOGOUT')
    clearMulti(['username', 'access_token', 'refresh_token'])
  }
}

const getters = {
  loggedIn (state) {
    return !!(state.username && state.access_token)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
