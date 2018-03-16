<template>
  <div class="hello">
    <h2>Riot Api Service</h2>
    <div>
      <h3>Search for summoner</h3>
      <form v-on:submit="requestSummonerData($event)">
        <input v-model="summonerName" placeholder="Summoner name">
        <input type="submit" value="Request Data" />
        <svg v-if="requestPending" class="loading__distractor loading__distractor--small" width="15px" height="15px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">´
          <circle class="loading__path" cx="15" cy="15" r="12"></circle>
        </svg>
      </form>
      <summoner-search-result v-if="summonerData"
        :name="summonerData.name"
        :level="summonerData.summonerLevel"
        :profileUrl="summonerData.profileUrl">
      </summoner-search-result>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ACT_LOAD_SUMMONER } from '@/store/modules/summoner';
import SummonerSearchResult from './summoner/SummonerSearchResult';

export default {
  name: 'Summoner',
  data() {
    return {
      summonerName: '',
    };
  },
  components: {
    'summoner-search-result': SummonerSearchResult,
  },
  computed: mapState({
    summonerData: state => state.summoner.searchResult.data,
    searchError: state => state.summoner.searchResult.error,
    requestPending: state => state.summoner.requestPending,
  }),
  // computed: mapState({
  //   summonerData: state => state.summoner.searchResult,
  //   requestPending: state => state.summoner.requestPending,
  // }),
  methods: {
    ...mapActions({
      loadSummoner: ACT_LOAD_SUMMONER,
    }),
    requestSummonerData(evt) {
      evt.preventDefault();
      this.loadSummoner({ name: this.summonerName });
    },
  },
};
</script>

<style scoped>
</style>
