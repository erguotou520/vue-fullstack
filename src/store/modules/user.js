import { merge } from 'lodash'
import { saveMulti, clearMulti } from '../../storage'
import { login, getUserInfo } from './user.api'
// eslint-disable-next-line camelcase
import { username, access_token, refresh_token } from '../../stored'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN } from '../../constants'

const state = {
  _id: '',
  role: 'guest',
  username: username,
  access_token, // eslint-disable-line
  refresh_token // eslint-disable-line
}

const mutations = {
  // set user info
  SET_USER_INFO (state, userInfo) {
    merge(state, userInfo)
  },
  // after logout
  LOGOUT (state) {
    state._id = ''
    state.username = ''
    state.role = 'guest'
    state.access_token = '' // eslint-disable-line
    state.refresh_token = '' // eslint-disable-line
  }
}

const actions = {
  // init user info
  initUserInfo ({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      // token
      if (username) {
        getUserInfo(state.access_token).then(data => { // eslint-disable-line
          if (data._id) {
            commit('SET_USER_INFO', data)
          }
          resolve(data)
        }).catch(err => { reject(err) })
      } else {
        resolve()
      }
    })
  },
  // login action
  login ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      login(payload.username, payload.password).then(data => {
        getUserInfo(data.token).then(user => {
          const userInfo = merge({}, user, {
            username: payload.username,
            access_token: data.token, // eslint-disable-line
            refresh_token: '' // eslint-disable-line
          })
          commit('SET_USER_INFO', userInfo)
          saveMulti([{
            key: STORE_KEY_USERNAME,
            value: userInfo.username
          }, {
            key: STORE_KEY_ACCESS_TOKEN,
            value: userInfo.access_token // eslint-disable-line
          }, {
            key: STORE_KEY_REFRESH_TOKEN,
            value: userInfo.refresh_token // eslint-disable-line
          }])
          resolve()
        }).catch(() => {})
      }).catch(err => { reject(err) })
    })
  },
  // refresh token action
  refreToken ({ commit }, payload) {
    commit('REFERE_TOKEN', payload)
    saveMulti([{
      key: STORE_KEY_ACCESS_TOKEN,
      value: payload.access_token // eslint-disable-line
    }, {
      key: STORE_KEY_REFRESH_TOKEN,
      value: payload.refresh_token // eslint-disable-line
    }])
  },
  // logout action
  logout ({ commit }, payload) {
    commit('LOGOUT')
    clearMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESS_TOKEN, STORE_KEY_REFRESH_TOKEN])
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
    return state.access_token // eslint-disable-line
  },
  username (state) {
    return state.username
  },
  loggedIn (state) {
    return !!(state.username && state.access_token) // eslint-disable-line
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
