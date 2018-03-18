<template>
  <div>
    <div v-if="loading" class="loading">
      <svg class="loading__distractor" width="30px" height="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle class="loading__path" cx="15" cy="15" r="12"></circle>
      </svg>
      <p class="loading__text">Loading...</p>
    </div>
    <div v-if="!loading">
      <h1>Details about {{name}}</h1>
      <div>
        <button v-on:click="loadSummoner({ name: $route.params.name })">Load data</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { loadSummoner } from '@/store/modules/summoner';

export default {
  name: 'SummonerDetails',
  computed: mapState({
    name: state => state.summoner.active.name,
    loading: state => state.summoner.requestPending,
  }),
  methods: {
    ...mapActions({
      loadSummoner,
    }),
  },
  mounted() {
    this.loadSummoner({ name: this.$route.params.name });
  },
};
</script>

