import to from '&/utils/to';
import { fetchMatchListByAccount } from '@/services/riotapiservice';

export const MUT_LOAD_MATCHES_START = 'LOAD_MATCHES_START';
export const MUT_LOAD_MATCHES_END = 'LOAD_MATCHES_END';
export const loadMatches = 'ACTION_LOAD_MATCHES';

export default {
  state: {
    matches: [],
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
      matches.forEach((match) => {
        state.activeSummoner.matchIds.push(match.gameId);
        state.matches[match.gameId] = match;
      });
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
      }
      commit(MUT_LOAD_MATCHES_END, result);
      return result;
    },
  },
};
