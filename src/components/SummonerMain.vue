<template>
    <div class="area">
      <div class="layout is-flex">
        <nav class="sidebar hide-sm" v-if="hasData">
          <router-link v-bind:to="`/summoner`" class="sidebar__item" exact>
            <span class="sidebar__headline">Search</span>
            <span class="sidebar__info">Search for someone</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/details`" class="sidebar__item">
            <span class="sidebar__headline">Profile</span>
            <span class="sidebar__info">Summoner summary</span>
          </router-link>
          <router-link v-bind:to="`/summoner/${name}/matches`" class="sidebar__item">
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
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { loadSummoner } from '@/store/modules/summoner';
import SummonerSearch from './summoner/SummonerSearch';

export default {
  name: 'SummonerMain',
  computed: {
    ...mapState({
      name: state => state.summoner.active.name,
      hasData: state => state.summoner.active.summonerLevel >= 0,
    }),
  },
  components: {
    'summoner-search': SummonerSearch,
  },
  methods: {
    ...mapActions({
      loadSummoner,
    }),
  },
  mounted() {
    if (this.$route && this.$route.params.name) {
      this.loadSummoner({ name: this.$route.params.name });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (from.params.name !== to.params.name && to.params.name) {
      this.loadSummoner({ name: to.params.name });
    }
    next();
  },
};
</script>
<style lang="scss" scoped>
.sidebar__info {
  overflow: hidden;
  max-height: 2em;
}
.sidebar__item {
  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    transition: background-color .25s, color .1s;
    background-color: #f0f0f0;
  }
}
.router-link-active {
  transition: background-color .5s, color .25s;
  background-color: #00848e;
  &.sidebar__item:hover {
    background-color: #028690;
  }
  &.sidebar__item:active {
    background-color: #048892;
  }
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
