import to from '&/utils/to';
import download from '@/utils/download';
import { RIOT_URLS, fetchRiotApi } from './riotapi';
import { getOrCreateElasticData, getData, updateOrCreateData } from '../elastic/elastic';

export const MATCH_URLS = {
  byAccount: `${RIOT_URLS.base}/${RIOT_URLS.match}/matchlists/by-account`,
  byId: `${RIOT_URLS.base}/${RIOT_URLS.match}/matches`,
  timelineById: `${RIOT_URLS.base}/${RIOT_URLS.match}/timelines/by-match`,
};

export async function fetchMatchesByAccountId(accountId, loadMore) {
  // get data from elastic, see if we have to update (invalidate after 40 min)
  // how much to collect? how to store? show stats of last 100 games
  // we can specify beginTime and endTime, but those must never be further than a
  // week apart (otherwise: error 400), so we got to queue them. if beginTime is
  // not specified, it's specified as the start time of the account

  // first: get 100 most recent games via byAccount. store the timestamp of the oldest one.
  // that's good enough for now. if users request more data, take oldest timestamp, substract
  // a week and request via beginTime and endTime. update oldest timestamp now to beginTime,
  // not to oldest game!

  // second: check if loadMore is set to true. if yes, we always have to do riot calls
  let startTime;
  let endTime;
  let err;
  let data;
  let responseDocument;
  let accountMatches;
  [err, data] = await to(getData(`matches/matches/${accountId}`));
  if (!err && data.found) {
    responseDocument = data._source;
  }
  console.log(`error fetching elastic (${err.message}) or no data found for account matches. fetching from riot...`);
  const matchAccountUrl = `${MATCH_URLS.byAccount}/${accountId}`;
  if (!data.found) {
    // if we didn't find any data, get latest 100 games from riot
    [err, data] = await to(fetchRiotApi(matchAccountUrl));
    if (!err) {
      accountMatches = data.matches.reduce((total, current) => {
        total.matches.push(current);
        const oldestMatchTimestamp = Math.min(total.oldestMatchTimestamp, current.timestamp);
        const newestMatchTimestamp = Math.max(total.newestMatchTimestamp, current.timestamp);
        return {
          oldestMatchTimestamp,
          newestMatchTimestamp,
          matches: total.matches,
        };
      },
      { matches: [], newestMatchTimestamp: 0, oldestMatchTimestamp: Number.MAX_VALUE });
    } else {
      console.log(`no data in elastic and error fetching result form riot: ${err.message}`);
    }
    // TODO store in elastic
  } else {
    // if we found data, check if it's still valid
    if (responseDocument.validUntil >= Date.now()) {
      // if yes, return valid data
      return responseDocument;
    }
    // if no, request latest 100 games from riot
    [err, data] = await to(fetchRiotApi(matchAccountUrl));
    if (!err) {
      responseDocument.matches = data.match.reduce((total, riotMatch) => {
        if (!total.find(elasticMatch => elasticMatch.gameId === riotMatch.gameId)) {
          total.push(riotMatch);
        }
        return total;
      }, responseDocument.matches);
      responseDocument.match.sort((a, b) => a - b);
      // TODO: oldest/newest
      // stored time series -> array of (from -> to) timestamps where we have data
    } else {
      console.log(`error fetching from riot, probably delivering outdated result: ${err.message}`);
    }
  }
  [err] = await to(updateOrCreateData(`matches/matches/${accountId}`, responseDocument));
  if (err && JSON.parse(err.message).type !== 'resource_already_exists_exception') { console.error('error creating `summoner` index:', err); }
  return responseDocument;
}
