import Summoner from '@/components/Summoner';
import SummonerDetails from '@/components/summoner/SummonerDetails';
import SummonerMatches from '@/components/summoner/SummonerMatches';

export default [
  {
    path: '/summoner',
    name: 'Summoner',
    component: Summoner,
    children: [
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
    ],
  },
];
