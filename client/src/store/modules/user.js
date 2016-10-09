import { saveMulti, clearMulti } from '../../storage'
import { init, login, getUserInfo } from './user.api'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN } from '../../constants'

const stored = init()

const state = {
  _id: '',
  role: 'guest',
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
  // set user info
  SET_USER_INFO (state, userInfo) {
    state._id = userInfo._id
    state.role = userInfo.role
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
  },
  // init user info
  initUserInfo ({ commit, state }) {
    if (state.access_token) {
      getUserInfo(state.access_token).then(data => {
        commit('SET_USER_INFO', data)
      })
    }
  }
}

const getters = {
  userId (state) {
    return state._id
  },
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
