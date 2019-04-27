import Vue from 'vue'
import Vuex from 'vuex'
import geo from './geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    async nuxtServerInit({
      commit
    }, { req, app }) {
      // const { status, data: { provice, city } } = await app.$axios.get('/geo/getPostion')
      // global.console.log(provice, city, status)
      global.console.log(await app.$axios.get('/geo/getPostion'))
    }
  }
})

export default store
