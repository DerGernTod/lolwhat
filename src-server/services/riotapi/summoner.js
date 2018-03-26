import to from '&/utils/to';
import download from '@/utils/download';
import { RIOT_URLS, fetchRiotApi } from './riotapi';
import { getOrCreateElasticData } from '../elastic/elastic';
import { fetchProfileIcon } from './static';

export const SUMMONER_URLS = {
  byAccount: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account`,
  byName: `${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-name`,
};

export async function fetchSummonerByName(summonerName) {
  return getOrCreateElasticData(
    `summoner/profiles/${summonerName}`,
    `${SUMMONER_URLS.byName}/${summonerName}`,
    Date.now() + (1000 * 60 * 60 * 6),
    async (data) => {
      const { profileIconId } = data;
      const [err, profileIcons] = await to(fetchProfileIcon(profileIconId));
      if (!err) {
        const path = `${profileIcons.version}/img/profileicon`;
        const fileName = profileIcons.imgData;
        let profileUrl = `${path}/${fileName}`;
        const ddragonPath = `http://ddragon.leagueoflegends.com/cdn/${profileUrl}`;
        const [downloadError] = await to(download(ddragonPath, fileName, `riot/${path}`));
        if (downloadError) {
          console.error(`error during profile image download: ${downloadError}`);
          profileUrl = ddragonPath;
        } else {
          console.log(`got profile icon data for icon id ${profileIconId}: ${profileUrl}`);
          profileUrl = `/static/riot/${profileUrl}`;
        }
        return { ...data, profileUrl };
      }
      console.error(`error getting profile icon: ${err.message || JSON.stringify(err)}`);
      return data;
    });
}

export function fetchSummonerByAccount(accountId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/by-account/${accountId}`);
}

export function fetchSummonerById(summonerId) {
  return fetchRiotApi(`${RIOT_URLS.base}/${RIOT_URLS.summoner}/${summonerId}`);
}
