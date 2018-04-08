import SummonerMain from '@/components/SummonerMain';
import SummonerMatches from '@/components/summoner/SummonerMatches';
import SummonerChampions from '@/components/summoner/SummonerChampions';
import SummonerDetails from '@/components/summoner/SummonerDetails';
import SummonerItems from '@/components/summoner/SummonerItems';
import SummonerRunes from '@/components/summoner/SummonerRunes';
import SummonerSearch from '@/components/summoner/SummonerSearch';

export default [
  {
    path: '/summoner',
    component: SummonerMain,
    children: [
      {
        path: '',
        name: 'SummonerSearch',
        component: SummonerSearch,
      },
      {
        path: ':name/details',
        name: 'SummonerDetails',
        component: SummonerDetails,
      },
      {
        path: ':name/matches',
        name: 'SummonerMatches',
        component: SummonerMatches,
      },
      {
        path: ':name/champions',
        name: 'SummonerChampions',
        component: SummonerChampions,
      },
      {
        path: ':name/runes',
        name: 'SummonerRunes',
        component: SummonerRunes,
      },
      {
        path: ':name/items',
        name: 'SummonerItems',
        component: SummonerItems,
      },
    ],
  },
];
