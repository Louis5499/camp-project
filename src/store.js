import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [],
    loginTeam: 0, // 1 ~ 8
    changes: [],
    isProcess: false,
    isBattling: false
  },
  mutations: {
    renewTeams(state,data) {
      state.teams = data;
    },
    setLoginTeam(state,teamNum) {
      state.loginTeam = teamNum;
    },
    renewChanges(state,data) {
      state.changes = data;
    },
    renewProcess(state,data) {
      state.isProcess = data;
    },
    renewBattling(state,data) {
      state.isBattling = data;
    }
  },
  actions: {
    updateData ({ commit, state }, data) {
      commit('renewTeams',data);
    },
    updateChanges ({ commit, state }, data) {
      commit('renewChanges',data);
    }
  }
})








