import { assign } from 'lodash'
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

let userInitPromise = null

const mutations = {
  // set user info
  SET_USER_INFO (state, userInfo) {
    state._id = userInfo._id
    state.role = userInfo.role
    state.username = userInfo.username
    state.access_token = userInfo.access_token
    state.refresh_token = userInfo.refresh_token
  },
  // update stored token
  UPDATE_TOKEN (state, payload) {
    state.access_token = payload.access_token
    state.refresh_token = payload.refresh_token
  },
  // after logout
  LOGOUT (state) {
    state._id = ''
    state.username = ''
    state.role = 'guest'
    state.access_token = ''
    state.refresh_token = ''
  }
}

const actions = {
  // login action
  login ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      login(payload.username, payload.password).then(data => {
        getUserInfo(data.token).then(user => {
          const userInfo = assign({}, user, {
            username: payload.username,
            access_token: data.token,
            refresh_token: ''
          })
          commit('SET_USER_INFO', userInfo)
          saveMulti([{
            key: STORE_KEY_USERNAME,
            value: userInfo.username
          }, {
            key: STORE_KEY_ACCESS_TOKEN,
            value: userInfo.access_token
          }, {
            key: STORE_KEY_REFRESH_TOKEN,
            value: userInfo.refresh_token
          }])
          resolve()
        }).catch(() => {})
      }).catch(err => { reject(err) })
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
  initUserInfo ({ commit, dispatch, state }) {
    userInitPromise = new Promise((resolve, reject) => {
      // token
      if (stored[1]) {
        getUserInfo(stored[1]).then(data => {
          const userInfo = assign({}, data, {
            username: stored[0],
            access_token: stored[1],
            refresh_token: stored[2]
          })
          commit('SET_USER_INFO', userInfo)
          resolve(userInfo)
        }).catch(err => { reject(err) })
      } else {
        resolve()
      }
    })
    return userInitPromise
  }
}

const getters = {
  userId (state) {
    return state._id
  },
  userRole (state) {
    return state.role
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

export { userInitPromise }
