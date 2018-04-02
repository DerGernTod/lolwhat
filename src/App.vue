<template>
  <div id="app">
    <div class="nav has-no-secondary">
      <router-link class="nav__brand" to="/">
        <i class="fas fa-address-card"></i>
      </router-link>
      <div class="nav__buttongroup">
        <a class="nav__btn nav__btn--cta"
          target="_blank"
          href="https://github.com/dergerntod/lolwhat">
            Find me on GitHub
        </a>
        <button v-on:click="toggleMenu"
          class="nav__btn--menutoggle nav__btn"
          data-target="#nav-bar">
            Menu
        </button>
      </div>
      <nav id="nav-bar" class="nav__bar">
        <ul class="nav__list nav__list--primary">
          <li class="nav__item">
            <router-link class="nav__link" to="/summoner">Summoner</router-link>
          </li>
          <li class="nav__item">
            <router-link class="nav__link" to="/champions">Champions</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-view></router-view>
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
  methods: {
    toggleMenu() {

    },
  },
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
.nav__list .router-link-active {
  background-color: #454646;
}
</style>
