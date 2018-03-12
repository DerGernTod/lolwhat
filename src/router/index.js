import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import SummonerDetails from '@/components/summoner/SummonerDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/summoner/:name',
      name: 'SummonerDetails',
      component: SummonerDetails,
    },
  ],
});
