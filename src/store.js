import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [],
    loginTeam: 0 // 1 ~ 8
  },
  mutations: {
    renewTeams(state,data) {
      state.teams = data;
    },
    setLoginTeam(state,teamNum) {
      state.loginTeam = teamNum;
    }
  },
  actions: {
    updateData ({ commit, state }, data) {
      commit('renewTeams',data);
    }
  }
})








