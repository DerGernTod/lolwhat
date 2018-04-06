<template>

  <div class="hello">
    <div>
      <form v-on:submit="requestSummonerData($event)">
        <fieldset class="fieldset">
          <div class="field">
            <label for="summonerNameId" class="label inputfield__icon--search">
              Search for summoner
            </label>
            <input :disabled="requestPending" id="summonerNameId"
              v-model="summonerName"
              type="search"
              class="inputfield inputfield--search">
          </div>
          <div class="field">
            <input :disabled="requestPending"
              role="button"
              type="submit"
              class="btn btn--primary"
              value="Request Data" />
          </div>
          <svg v-show="requestPending" class="loading__distractor loading__distractor--small" width="15px" height="15px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">´
            <circle class="loading__path" cx="15" cy="15" r="12"></circle>
          </svg>
        </fieldset>
      </form>
      <summoner-search-result v-if="summonerData"
        :name="summonerData.name"
        :level="summonerData.summonerLevel"
        :profileUrl="summonerData.profileUrl">
      </summoner-search-result>
      <div v-else-if="searchError">
        Couldn't find data for summoner.
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { loadSummoner } from '@/store/modules/summoner';
import SummonerSearchResult from './SummonerSearchResult';

export default {
  name: 'SummonerSearch',
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
      loadSummoner,
    }),
    requestSummonerData(evt) {
      evt.preventDefault();
      this.loadSummoner({ name: this.summonerName });
    },
  },
};
</script>
