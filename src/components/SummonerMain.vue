<template>
    <div class="area">
      <div class="layout is-flex">
        <nav class="sidebar hide-sm" v-if="hasData">
          <router-link v-bind:to="`/summoner/${name}/details`" class="sidebar__item is-active">
            <span class="sidebar__headline">Profile</span>
            <span class="sidebar__info">Summoner summary</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/matches`" class="sidebar__item is-active">
            <span class="sidebar__headline">Matches</span>
            <span class="sidebar__info">Comparison and performance</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/champions`" class="sidebar__item">
            <span class="sidebar__headline">Champions</span>
            <span class="sidebar__info">Matchup success and failures</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/runes`" class="sidebar__item">
            <span class="sidebar__headline">Runes</span>
            <span class="sidebar__info">Favourite runesets</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/items`" class="sidebar__item">
            <span class="sidebar__headline">Items</span>
            <span class="sidebar__info">Build performance</span>
          </router-link>
        </nav>
        <div class="island island--connected">
          <summoner-search></summoner-search>
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SummonerSearch from './summoner/SummonerSearch';

export default {
  name: 'SummonerMain',
  computed: mapState({
    name: state => state.summoner.active.name,
    hasData: state => state.summoner.active.summonerLevel,
  }),
  components: {
    'summoner-search': SummonerSearch,
  },
};
</script>
<style lang="scss" scoped>
.sidebar__info {
  overflow: hidden;
  max-height: 2em;
}
.router-link-active {
  transition: background-color 0.25s, color 0.1s;
  background-color: #00848e;
  .sidebar__headline {
    margin-left: .25em;
    color: white;
  }
  .sidebar__info {
    max-height: 0;
    transition: max-height .25s;
  }
}
</style>
