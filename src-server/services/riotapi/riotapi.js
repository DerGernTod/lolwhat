import timeout from '&/utils/timeout';
import fetch from 'node-fetch';
import secrets from '../../secrets.json';

let curWaitUntil = 0;
let activePromise = Promise.resolve();
export const RIOT_URLS = {
  base: 'https://euw1.api.riotgames.com/lol',
  championMastery: 'champion-mastery/v3',
  champion: 'platform/v3/champions',
  league: 'league/v3',
  staticData: 'static-data/v3',
  status: 'status/v3/shard-data',
  match: 'match/v3',
  spectator: 'spectator/v3',
  summoner: 'summoner/v3/summoners',
  thirdPartyCode: 'platform/vr/third-party-code/by-summoner',
  tournamentStub: 'tournament-stub/v3',
  tournament: 'tournament/v3',
};

function waitUntilAllowed() {
  const totalWaitTime = curWaitUntil - Date.now();
  if (totalWaitTime <= 0) {
    return Promise.resolve();
  }
  return timeout(totalWaitTime).then(() => waitUntilAllowed());
}

export function fetchRiotApi(url) {
  console.log(`Riotapi fetch to ${url}`);
  activePromise = activePromise
    .then(waitUntilAllowed)
    .then(() => fetch(`${url}?api_key=${secrets.apiKey}`))
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject({
          status: response.status,
          retryAfter: response.headers.get('retry-after'),
        });
      }
      return response.json();
    })
    .catch((error) => {
      if (error.status === 429) {
        curWaitUntil = Date.now() + error.retryAfter;
        return fetchRiotApi(url);
      }
      return Promise.reject(error);
    });
  return activePromise;
}
