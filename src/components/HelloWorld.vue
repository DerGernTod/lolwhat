<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
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
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { loadSummoner } from '@/store/action-types';
import SummonerSearchResult from './summoner/SummonerSearchResult';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      summonerName: '',
    };
  },
  components: {
    'summoner-search-result': SummonerSearchResult,
  },
  computed: mapState({
    summonerData: state => state.summoner.searchResult.fetchResult,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
