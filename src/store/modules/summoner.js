import { fetchSummonerByName } from '@/services/riotapiservice';
import to from '&/utils/to';

export const MUT_CHANGE_ACTIVE_SUMMONER = 'CHANGE_ACTIVE_SUMMONER';
export const MUT_LOAD_SUMMONER_START = 'LOAD_SUMMONER_START';
export const MUT_LOAD_SUMMONER_COMPLETE = 'LOAD_SUMMONER_COMPLETE';
export const loadSummoner = 'ACTION_LOAD_SUMMONER';
export const searchSummoner = 'ACTION_SEARCH_SUMMONER';

export default {
  state: {
    searchResult: {
      data: null,
      error: null,
    },
    active: {
      name: 'Unknown Summoner',
      profileIconUrl: '/static/images/empty/profileIcon.png',
      level: 0,
    },
    requestPending: false,
  },
  mutations: {
    [MUT_CHANGE_ACTIVE_SUMMONER](state, payload) {
      state.active = payload.summoner;
    },
    [MUT_LOAD_SUMMONER_START](state) {
      state.searchResult = {};
      state.requestPending = true;
    },
    [MUT_LOAD_SUMMONER_COMPLETE](state, payload) {
      state.requestPending = false;
      state.searchResult = payload;
    },
  },
  actions: {
    async [loadSummoner]({ commit, dispatch }, payload) {
      const searchResult = await dispatch(searchSummoner, payload);
      const { data } = searchResult;
      if (data) {
        commit(MUT_CHANGE_ACTIVE_SUMMONER, { summoner: data });
      }
      return searchResult;
    },
    async [searchSummoner]({ commit }, payload) {
      let result;
      try {
        commit(MUT_LOAD_SUMMONER_START);
        const [error, data] = await to(fetchSummonerByName(payload.name));
        if (error || data.error) {
          result = { error: error || data.error };
        } else {
          result = { data };
        }
      } catch (error) {
        result = { error };
        return error;
      }
      commit(MUT_LOAD_SUMMONER_COMPLETE, result);
      return result;
    },
  },
};
