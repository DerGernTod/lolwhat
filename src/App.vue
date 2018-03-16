<template>
  <div id="app">
    <div class="nav has-no-secondary">
      <a class="nav__brand" href="#/">
        <img class="nav__logo" alt="LoLWhat?! Logo">
      </a>
      <div class="nav__buttongroup">
        <a class="nav__btn nav__btn--cta" target="_blank" href="https://github.com/dergerntod/lolwhat">Find me on GitHub</a>
        <button class="nav__btn--menutoggle nav__btn" data-target="#nav-bar">Menu</button>
      </div>
      <nav id="nav-bar" class="nav__bar">
        <ul class="nav__list nav__list--primary">
          <li class="nav__item">
            <a class="nav__link" href="#/">Summoner</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="#/champions">Champions</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="area">
      <div class="layout is-flex">
        <nav class="sidebar hide-sm">
          <a href="#" class="sidebar__item is-active">
            <span class="sidebar__headline">Matches</span>
            <span class="sidebar__info">Comparison and performance</span>
          </a>
          <a href="#/summoner/champions" class="sidebar__item">
            <span class="sidebar__headline">Champions</span>
            <span class="sidebar__info">Matchup success and failures</span>
          </a>
          <a href="#/summoner/runes" class="sidebar__item">
            <span class="sidebar__headline">Runes</span>
            <span class="sidebar__info">Favourite runesets</span>
          </a>
          <a href="#/summoner/items" class="sidebar__item">
            <span class="sidebar__headline">Items</span>
            <span class="sidebar__info">Build performance</span>
          </a>
        </nav>
        <div class="island island--connected">
          <router-view/>
        </div>
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

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color:#f8f8f8;
}
</style>
