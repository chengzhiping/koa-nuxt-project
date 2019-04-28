export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const {
      status,
      data: {
        province,
        city
      }
    } = await app.$axios.get('http://localhost:3000/geo/getPosition')
    global.console.log('nuxtServerInith获取到的定位：', status, province, city)
    commit('modules/geo/setPosition', status === 200 ? { city, province } : { city: '', province })

    const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
    commit('modules/home/setMenu', status2 === 200 ? menu : [])

    // const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
    //   params: {
    //     city: app.store.state.geo.position.city.replace('市', '')
    //   }
    // })
    // commit('home/setHotPlace', status3 === 200 ? result : [])
  }
}
