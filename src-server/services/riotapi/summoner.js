import { RIOT_URLS, fetchRiotApi } from './riotapi';

const SUMMONER_URLS = {
  byAccount: 'by-account',
  byName: 'by-name',
};

export function fetchSummonerByName(summonerName) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-name/${summonerName}`);
}

export function fetchSummonerByAccount(accountId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account/${accountId}`);
}

export function fetchSummonerById(summonerId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/${summonerId}`);
}
