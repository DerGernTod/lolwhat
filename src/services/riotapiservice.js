export function fetchMatchListByAccount(accountId) {
  return fetch('/api/matchlist').then(response => response.json());
  // return fetchRiotApi(`${accountUrl}${accountId}?api_key=${apiKey}`);
}

export function fetchMatchById(matchId) {
  // return fetchRiotApi(`${matchUrl}${matchId}?api_key=${apiKey}`);
}
