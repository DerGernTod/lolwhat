<template>
  <div id="app" class="layout is-flex">
    <header class="header">
      <h1>LoLWhat?!</h1>
    </header>
    <div class="layout is-flex">
      <nav class="sidebar hide-sm">
        <a href="#" class="sidebar__item is-active">
          <span class="sidebar__headline">General</span>
          <span class="sidebar__info">Some general stuff</span>
        </a>
        <a href="#" class="sidebar__item">
          <span class="sidebar__headline">Champions</span>
          <span class="sidebar__info">Details about champions</span>
        </a>
      </nav>
      <div class="island island--connected">
        <router-view/>
      </div>
    </div>
    <footer class="layout footer">
      <div>
        &copy; Gernot Raudner 2018
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
