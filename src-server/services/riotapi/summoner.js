import to from '&/utils/to';
import { RIOT_URLS, fetchRiotApi } from './riotapi';
import { getData, putData } from '../elastic/elastic';

const SUMMONER_URLS = {
  byAccount: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account`,
  byName: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-name`,
};

export async function fetchSummonerByName(summonerName) {
  let [err, summonerData] = await to(getData(`summoner/${summonerName}`));
  console.log(`got summoner result ${JSON.stringify(summonerData)}`);
  if (!err && summonerData.found && summonerData._source.validUntil > Date.now()) {
    return summonerData._source;
  }
  console.log(`no valid data in elastic, fetching from riot api: ${err}`);
  [err, summonerData] = await to(fetchRiotApi(`${SUMMONER_URLS.byName}/${summonerName}`));
  console.log(`got riot api summoner result: ${JSON.stringify(summonerData)}`);
  if (summonerData.accountId) {
    summonerData.validUntil = Date.now() + (1000 * 60 * 60 * 6);
    const [putErr, putResult] = await to(putData(`summoner/${summonerName}`, summonerData));
    console.log('elastic put done:', putErr, putResult);
    return summonerData;
  }
  return null;
}

export function fetchSummonerByAccount(accountId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account/${accountId}`);
}

export function fetchSummonerById(summonerId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/${summonerId}`);
}
