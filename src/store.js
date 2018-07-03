import Vue from 'vue'
import Vuex from 'vuex'
import Data from './components/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [],
    loginTeam: 0 // 1 ~ 8
  },
  mutations: {
    renewTeams(state,data) {
      state.teams = data.teams;
    },
    setLoginTeam(state,teamNum) {
      state.loginTeam = teamNum;
    }
  },
  actions: {
    updateData ({ commit, state }, data) {
      commit('renewTeams',Data);
    }
  }
})








