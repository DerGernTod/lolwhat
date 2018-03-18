import timeout from '&/utils/timeout';
import fetch, { Headers } from 'node-fetch';
import secrets from '../../secrets.json';

let curWaitUntil = 0;
let fetchRunning = false;
const curListeners = [];
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
  console.log('remaining waiting time: ', totalWaitTime);
  return timeout(Math.min(10000, totalWaitTime)).then(() => waitUntilAllowed());
}

export async function fetchRiotApi(url) {
  /* eslint-disable no-await-in-loop */

  // if a fetch is currently running, create a new promise that
  // is enqueued. await it's resolution
  if (fetchRunning) {
    await new Promise((resolve) => {
      curListeners.push(resolve);
    });
  }
  fetchRunning = true;
  await waitUntilAllowed();
  let response = { status: 429 };
  while (response.status === 429) {
    response = await fetch(url, {
      headers: new Headers({ 'x-riot-token': secrets.apiKey }),
    });
    if (response.status === 429) {
      curWaitUntil = Date.now() + response.headers.get('retry-after');
    }
    await waitUntilAllowed();
  }
  /* eslint-enable no-await-in-loop */

  // this fetch isn't running anymore, so resolve the first
  // promise that was registered to be queued, so that this
  // request is triggered next
  fetchRunning = false;
  if (curListeners.length) {
    curListeners.splice(1)[0]();
  }
  if (response.status !== 200) {
    throw new Error('Received invalid status from riot api: ', response.status);
  }
  return response.json();
}
