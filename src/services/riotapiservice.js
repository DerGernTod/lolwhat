export function fetchMatchListByAccount(accountId) {
  return fetch(`/api/matchListByAccount/${accountId}`).then(response => response.json());
}
export function fetchSummonerByName(summonerName) {
  return fetch(`/api/summonerByName/${summonerName}`).then(response => response.json());
}

// export function fetchMatchById(matchId) {
// }
