import Vue from 'vue';
import Vuex from 'vuex';
import { loadSummonerComplete, loadSummonerStart, changeActiveSummoner } from '@/store/mutation-types';
import { loadSummoner, searchSummoner } from '@/store/action-types';
import { fetchSummonerByName } from '@/services/riotapiservice';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    summoner: {
      searchResult: {},
      active: {
        name: 'Unknown Summoner',
        profileIconUrl: '/static/images/empty/profileIcon.png',
        level: 0,
      },
      requestPending: false,
    },
  },
  mutations: {
    [changeActiveSummoner](state, payload) {
      state.summoner.active = payload.summoner;
    },
    [loadSummonerStart](state) {
      state.summoner.searchResult = {};
      state.summoner.requestPending = true;
    },
    [loadSummonerComplete](state, payload) {
      state.summoner.requestPending = false;
      state.summoner.searchResult = payload;
    },
  },
  actions: {
    async [loadSummoner]({ commit, dispatch }, payload) {
      const searchResult = await dispatch(searchSummoner, payload);
      const { fetchResult } = searchResult;
      if (fetchResult) {
        commit(changeActiveSummoner, { summoner: fetchResult });
      }
      return searchResult;
    },
    async [searchSummoner]({ commit }, payload) {
      let result;
      try {
        commit(loadSummonerStart);
        const fetchResult = await fetchSummonerByName(payload.name);
        result = { fetchResult };
      } catch (error) {
        result = { error };
        return error;
      }
      commit(loadSummonerComplete, result);
      return result;
    },
  },
});

export default store;
