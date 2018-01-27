import timeout from '@/utils/timeout';

let curWaitUntil = 0;
let activePromise = Promise.resolve();

const baseUrl = 'https://euw1.api.riotgames.com/lol/match/v3';
const accountUrl = `${baseUrl}/matchlists/by-account/`;
const matchUrl = `${baseUrl}/matches/`;
const apiKey = 'RGAPI-b8f8874d-43b6-49aa-b1a7-e5a793378a08';

function waitUntilAllowed() {
  const totalWaitTime = curWaitUntil - Date.now();
  if (totalWaitTime <= 0) {
    return Promise.resolve();
  }
  return timeout(totalWaitTime).then(() => waitUntilAllowed());
}

export default function fetchRiotApi(url) {
  activePromise = activePromise.then(waitUntilAllowed)
    .then(() => fetch(url))
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

export function fetchMatchListByAccount(accountId) {
  return fetch('/api/matchlist').then(response => response.json());
  // return fetchRiotApi(`${accountUrl}${accountId}?api_key=${apiKey}`);
}

export function fetchMatchById(matchId) {
  return fetchRiotApi(`${matchUrl}${matchId}?api_key=${apiKey}`);
}
