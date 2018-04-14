<template>
  <div>
    Matches
    <loading-distractor v-if="loading"></loading-distractor>
    <ul v-if="!loading && hasValues">
      <li v-if="!matches.length">No matches found</li>
      <li v-for="match in matches" v-bind:key="match.gameId">
        <div>{{new Date(match.timestamp).toLocaleString()}}:</div>
        <div>
          <div>champ: {{match.champion}}</div>
          <div>lane: {{match.lane}}</div>
          <div>role: {{match.role}}</div>

        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { loadMatches, activeAccountMatches } from '@/store/modules/matches';
import LoadingDistractor from '../utils/LoadingDistractor';

export default {
  name: 'SummonerMatches',
  components: {
    'loading-distractor': LoadingDistractor,
  },
  computed: {
    ...mapState({
      accountId: state => state.summoner.active.accountId,
      name: state => state.summoner.active.name,
      level: state => state.summoner.active.summonerLevel,
      profileUrl: state => state.summoner.active.profileUrl,
      loading: state => state.matches.requestPending,
      hasValues: state => state.matches.activeSummoner.accountId !== -1,
    }),
    ...mapGetters({
      matches: activeAccountMatches,
    }),
  },
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
