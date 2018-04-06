import { fetchSummonerByName } from '@/services/riotapiservice';
import to from '&/utils/to';

export const MUT_CHANGE_ACTIVE_SUMMONER_START = 'CHANGE_ACTIVE_SUMMONER_START';
export const MUT_CHANGE_ACTIVE_SUMMONER_END = 'CHANGE_ACTIVE_SUMMONER_END';
export const MUT_LOAD_SUMMONER_START = 'LOAD_SUMMONER_START';
export const MUT_LOAD_SUMMONER_COMPLETE = 'LOAD_SUMMONER_COMPLETE';
export const loadSummoner = 'ACTION_LOAD_SUMMONER';
export const searchSummoner = 'ACTION_SEARCH_SUMMONER';
const defaultActiveSummoner = {
  name: 'Unknown Summoner',
  profileIconUrl: '/static/images/empty/profileIcon.png',
  summonerLevel: -1,
  accountId: -1,
  profileIconId: -1,
  revisionDate: 0,
  validUntil: 0,
  requestPending: false,
};
export default {
  state: {
    searchResult: {
      data: null,
      error: null,
    },
    active: defaultActiveSummoner,
    requestPending: false,
  },
  mutations: {
    [MUT_CHANGE_ACTIVE_SUMMONER_END](state, payload) {
      state.active = {
        ...payload.summoner,
        requestPending: false,
      };
    },
    [MUT_CHANGE_ACTIVE_SUMMONER_START](state) {
      state.active = {
        ...defaultActiveSummoner,
        requestPending: true,
      };
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
      commit(MUT_CHANGE_ACTIVE_SUMMONER_START);
      const searchResult = await dispatch(searchSummoner, payload);
      const { data } = searchResult;
      if (data) {
        commit(MUT_CHANGE_ACTIVE_SUMMONER_END, { summoner: data });
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
