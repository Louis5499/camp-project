import Vue from 'vue'
import Vuex from 'vuex'
import Data from './components/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: []
  },
  mutations: {
    renew(state,data) {
      state.teams = data.teams;
    }
  },
  actions: {
    updateData ({ commit, state }, data) {
      commit('renew',Data);
    }
  }
})








