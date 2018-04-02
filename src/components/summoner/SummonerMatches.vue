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
<script>

export default {
  name: 'SummonerDetails',
};
</script>
