export const state = () => ({
  postion: {}
})

export const mutations = {
  setPosition(state, val) {
    state.postion = val
  }
}

export const actions = {
  setPosition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  }
}
