import Vue from 'vue';
import to from '&/utils/to';
import { fetchMatchListByAccount } from '@/services/riotapiservice';

export const MUT_LOAD_MATCHES_START = 'LOAD_MATCHES_START';
export const MUT_LOAD_MATCHES_END = 'LOAD_MATCHES_END';
export const loadMatches = 'ACTION_LOAD_MATCHES';
export const activeAccountMatches = 'GETTER_ACTIVE_ACCOUNT_MATCHES';
export default {
  state: {
    matches: {
      initialized: true,
    },
    activeSummoner: {
      matchIds: [],
      accountId: -1,
      newestMatchTimestamp: -1,
      oldestMatchTimestamp: -1,
    },
    requestPending: false,
    error: null,
  },
  mutations: {
    [MUT_LOAD_MATCHES_START](state) {
      state.requestPending = true;
    },
    [MUT_LOAD_MATCHES_END](state, payload) {
      state.requestPending = false;
      const {
        matches,
        accountId,
        newestMatchTimestamp,
        oldestMatchTimestamp,
      } = payload;

      state.activeSummoner = {
        matchIds: [],
        accountId,
        newestMatchTimestamp,
        oldestMatchTimestamp,
      };
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        state.activeSummoner.matchIds.push(match.gameId);
        Vue.set(state.matches, match.gameId, match);
      }
      state.error = payload.error;
    },
  },
  actions: {
    async [loadMatches]({ commit }, payload) {
      commit(MUT_LOAD_MATCHES_START);
      const [error, data] = await to(fetchMatchListByAccount(payload.accountId));
      let result = {};
      if (error || data.error) {
        result = { error: error || data.error };
      } else {
        result = data;
        result.accountId = payload.accountId;
      }
      commit(MUT_LOAD_MATCHES_END, result);
      return result;
    },
  },
  getters: {
    [activeAccountMatches]: state =>
      state.activeSummoner.matchIds
        .map(gameId => state.matches[gameId])
        .sort((a, b) => a.timestamp - b.timestamp),
  },
};
