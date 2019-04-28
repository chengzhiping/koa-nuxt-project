export const state = () => ({
  leads: []
})

export const mutations = {
  SET_LEADS(state, leads) {
    state.leads = leads
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const { status, data: { province, city } } = await app.$axios.get('http://localhost:3000/geo/getPosition')
    global.console.log(status, province, city)
  }
}
