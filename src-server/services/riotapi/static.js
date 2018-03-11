import { RIOT_URLS, fetchRiotApi } from './riotapi';
import { getOrCreateElasticData } from '../elastic/elastic';

const STATIC_URLS = {
  profileIcons: `${RIOT_URLS.base}/${RIOT_URLS.staticData}/profile-icons`,
  champions: `${RIOT_URLS.base}/${RIOT_URLS.staticData}/champions`,
};

export function fetchProfileIcons() {
  return getOrCreateElasticData(
    'static/profile-icons',
    `${STATIC_URLS.profileIcons}?locale=en_US`,
    Date.now() + (1000 * 60 * 60 * 24 * 7));
}

export function fetchChampionData() {
  return fetchRiotApi(`${RIOT_URLS.staticData}/champions`);
}
