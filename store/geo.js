const state = () => ({ postion: {} })

const mutations = {
  setPosition(state, val) {
    state.postion = val
  }
}

const actions = {
  setPosition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
