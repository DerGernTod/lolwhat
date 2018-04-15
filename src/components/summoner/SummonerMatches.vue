<template>
  <div>
    Matches
    <loading-distractor v-if="loading"></loading-distractor>
    <ul v-if="!loading && accountId >= 0">
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
      loading: state => state.summoner.requestPending || state.matches.requestPending,
    }),
    ...mapGetters({
      matches: activeAccountMatches,
    }),
  },
  watch: {
    accountId(newId) {
      if (newId >= 0) {
        this.loadMatches({ accountId: newId });
      }
    },
  },
  methods: {
    ...mapActions({
      loadMatches,
    }),
  },
};
</script>
