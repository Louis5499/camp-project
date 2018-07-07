import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getTeams: state => state.teams,
    getAnnouncement: state => state.announcement,
    getIsBattling: state => state.isBattling,
    getIsProcess: state => state.isProcess
  },
  state: {
    teams: [],
    loginTeam: 0, // 1 ~ 8
    changes: [],
    isProcess: false,
    isBattling: false,
    announcement: '',
    eventTrigger: false,
    eventType: ''
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
    },
    renewAnnounce(state,data) {
      state.announcement = data.message;
      state.eventType = data.type;
      state.eventTrigger = true;
    },
    eventFlagDown(state) {
      state.eventTrigger = false;
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








