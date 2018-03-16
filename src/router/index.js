import Vue from 'vue';
import Router from 'vue-router';
import Summoner from '@/components/Summoner';
import SummonerDetails from '@/components/summoner/SummonerDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Summoner',
      component: Summoner,
    },
    {
      path: '/summoner/:name',
      name: 'SummonerDetails',
      component: SummonerDetails,
    },
  ],
});
