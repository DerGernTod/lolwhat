<template>
  <div v-bind:title="apiUrls">
    <label for="progress"
      class="label--progressbar"
      v-if="progressPercentage < 1">
      {{currentTimeStamp - apiProgressStartTime}}/{{apiWaitTime}}
    </label>
    <progress id="progress" class="progressbar"
      v-bind:value="progressPercentage || 1" max="1"></progress>
  </div>
</template>
<script>
export default {
  name: 'RiotApiStatus',
  data() {
    return {
      apiWaitTime: 1,
      apiQueueLength: 0,
      apiUrls: [],
      apiProgressStartTime: Date.now(),
      currentTimeStamp: Date.now(),
    };
  },
  computed: {
    progressPercentage: () =>
      (this.currentTimeStamp - this.apiProgressStartTime) / (this.apiWaitTime || 1),
  },
  mounted() {
    setInterval(() => {
      this.currentTimeStamp = Date.now();
    }, 100);
    const ws = new WebSocket(`ws://${location.hostname}:3000`);
    ws.onmessage = (evt) => {
      const { apiWaitTime, apiQueueLength, apiUrls } = JSON.parse(evt.data);
      this.apiWaitTime = apiWaitTime || 1;
      this.apiQueueLength = apiQueueLength;
      this.apiUrls = Object.keys(apiUrls);
      this.apiProgressStartTime = Date.now();
    };
  },
};
</script>

<style scoped>
div {
  width: 100px;
  margin: 0 1em;
}
.label--progressbar {
  color: white;
}
</style>
