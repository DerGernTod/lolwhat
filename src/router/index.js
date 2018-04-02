import Vue from 'vue';
import Router from 'vue-router';
import SummonerRoutes from './summonerRoutes';

Vue.use(Router);

export default new Router({
  routes: [
    ...SummonerRoutes,
  ],
  linkActiveClass: 'router-link-active',
});
