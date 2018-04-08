<template>
  <div>
    Matches
    <loading-distractor v-if="loading"></loading-distractor>
    <ul v-if="!loading && hasValues">
      <!-- <li v-for="match in matches" v-bind:key="match.gameId">
        <span>{{match.timestamp}}</span>: {{match.role}}
      </li> -->
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { loadMatches } from '@/store/modules/matches';
import LoadingDistractor from '../utils/LoadingDistractor';

export default {
  name: 'SummonerMatches',
  components: {
    'loading-distractor': LoadingDistractor,
  },
  computed: mapState({
    accountId: state => state.summoner.active.accountId,
    name: state => state.summoner.active.name,
    level: state => state.summoner.active.summonerLevel,
    profileUrl: state => state.summoner.active.profileUrl,
    loading: state => state.matches.requestPending,
    matches: state => state.matches
      .activeSummoner.matchIds.map(gameId => state.matches.matches[gameId]) || [],
    hasValues: state => state.matches.activeSummoner.accountId !== -1,
  }),
  methods: {
    ...mapActions({
      loadMatches,
    }),
  },
  mounted() {
    this.loadMatches({ accountId: this.accountId });
    // this.loadSummoner({ name: this.$route.params.name });
  },
  beforeRouteUpdate(to, from, next) {
    // this.loadSummoner({ name: to.params.name });
    this.loadMatches({ accountId: this.accountId });
    next();
  },
};
</script>
