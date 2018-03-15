<template>
  <div>
    <h1>Details about {{name}}</h1>
    <div>
      <button v-on:click="loadSummoner({ name: $route.params.name })">Load data</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { loadSummoner } from '@/store/action-types';

export default {
  name: 'SummonerDetails',
  computed: mapState({
    name: state => state.summoner.active.name,
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

