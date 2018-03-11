import to from '&/utils/to';
import { RIOT_URLS, fetchRiotApi } from './riotapi';
import { getData, putData, getOrCreateElasticData } from '../elastic/elastic';
import { fetchProfileIcons } from './static';

const SUMMONER_URLS = {
  byAccount: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account`,
  byName: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-name`,
};

export async function fetchSummonerByName(summonerName) {
  return getOrCreateElasticData(
    `summoner/${summonerName}`,
    `${SUMMONER_URLS.byName}/${summonerName}`,
    Date.now() + (1000 * 60 * 60 * 6),
    async (data) => {
      const { profileIconId } = data;
      const [err, profileIcons] = await to(fetchProfileIcons());
      if (!err) {
        const profileUrl =
          `http://ddragon.leagueoflegends.com/cdn/${
            profileIcons.version
          }/img/profileicon/${
            profileIcons.data[profileIconId].image.full
          }`;
        console.log(`got profile icon data for icon id ${profileIconId}: ${JSON.stringify(profileUrl)}`);
        return { ...data, profileUrl };
      }
      console.error(`error getting profile icon: ${JSON.stringify(err)}`);
      return data;
    });
}

export function fetchSummonerByAccount(accountId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account/${accountId}`);
}

export function fetchSummonerById(summonerId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/${summonerId}`);
}
