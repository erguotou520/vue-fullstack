import { saveMulti, clearMulti } from '../../storage'
import { init, login } from './user.api'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN } from '../../constants'

const { stored, userInfo } = init()

const state = {
  _id: userInfo._id || '',
  role: userInfo.role || 'guest',
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
  login ({ commit }, payload) {
    return login(payload.username, payload.password).then(data => {
      commit('LOGIN', {
        username: payload.username,
        access_token: data.token,
        refresh_token: ''
      })
      saveMulti([{
        key: STORE_KEY_USERNAME,
        value: payload.username
      }, {
        key: STORE_KEY_ACCESS_TOKEN,
        value: data.token
      }, {
        key: STORE_KEY_REFRESH_TOKEN,
        value: ''
      }])
      return data
    })
  },
  // refresh token action
  refreToken ({ commit }, payload) {
    commit('REFERE_TOKEN')
    saveMulti[{
      key: STORE_KEY_ACCESS_TOKEN,
      value: payload.access_token
    }, {
      key: STORE_KEY_REFRESH_TOKEN,
      value: payload.refresh_token
    }]
  },
  // logout action
  logout ({ commit }, payload) {
    commit('LOGOUT')
    clearMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN])
  }
}

const getters = {
  accessToken (state) {
    return state.access_token
  },
  username (state) {
    return state.username
  },
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
