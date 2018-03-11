<template>
  <button class="tile">
    <div class="tile__header">
      <div class="tile__iconbox">
        <img :src="profileUrl" />
      </div>
      <h1 class="tile__heading">{{name}}</h1>
      <h2 class="tile__subheading">Level {{level}}</h2>
    </div>
  </button>
</template>
<script>
export default {
  name: 'SummonerSearchResult',
  props: ['name', 'level', 'profileUrl'],
  data() {
    return {};
  },
  methods: {},
};
</script>
