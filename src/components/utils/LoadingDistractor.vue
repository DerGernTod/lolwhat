<template>
  <div class="loading">
    <svg class="loading__distractor" width="30px" height="30px" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle class="loading__path" cx="15" cy="15" r="12"></circle>
    </svg>
    <p class="loading__text">Loading...</p>
  </div>
</template>
<script>
export default {
  name: 'LoadingDistractor',
};
</script>
