<template>
  <div>
    <div v-if="loading" class="loading">
      <svg class="loading__distractor" width="30px" height="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle class="loading__path" cx="15" cy="15" r="12"></circle>
      </svg>
      <p class="loading__text">Loading...</p>
    </div>
    <div class="details" v-if="!loading">
      <div class="img-crop" v-bind:style="{ 'background-image': 'url(' + profileUrl + ')' }"></div>
      <div class="profile-text">
        <div class="name">{{name}}</div>
        <div class="level">Level {{level}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .profile-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 3em;
    }
  }
  .img-crop {
    flex-basis: 300px;
    background: no-repeat center;
    background-size: cover;
    border-radius: 50%;
    border: 3px solid gray;
    width: 300px;
    height: 300px;
  }
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import { loadSummoner } from '@/store/modules/summoner';

export default {
  name: 'SummonerDetails',
  computed: mapState({
    name: state => state.summoner.active.name,
    level: state => state.summoner.active.summonerLevel,
    profileUrl: state => state.summoner.active.profileUrl,
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
  beforeRouteUpdate(to, from, next) {
    this.loadSummoner({ name: to.params.name });
    next();
  },
};
</script>

