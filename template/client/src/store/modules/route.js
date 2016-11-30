const state = {
  loading: false
}

const mutations = {
  CHANGE (state, status) {
    state.loading = !!status
  }
}

const actions = {
  changeRouteLoading ({ commit }, status) {
    commit('CHANGE', status)
  }
}

const getters = {
  routeLoadingStatus (state) {
    return state.loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
