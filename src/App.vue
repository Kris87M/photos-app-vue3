<template>
  <div id="app">
    <div class="container p-p-4">
      <app-header />
      <main>
        <router-view v-slot="{ Component }">
          <SlideFadeAnimation v-if="!isModalRoute">
            <component :is="Component" :key="$route.fullPath" />
          </SlideFadeAnimation>
          <component v-else :is="Component" :key="$route.fullPath" />
        </router-view>
      </main>
      <app-footer />
    </div>
  </div>
</template>

<script>
import './styles/global.scss'
import 'normalize.css'

import AppHeader from './components/layout/theHeader.vue'
import AppFooter from './components/layout/theFooter.vue'
import SlideFadeAnimation from './components/layout/SlideFadeAnimation.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { AppHeader, AppFooter, SlideFadeAnimation },
  computed: {
    isModalRoute () {
      return this.$route.name === 'single-photo' || this.$route.name === 'category-single-photo'
    }
  },
  methods: {
    ...mapActions('Categories', ['fetchCategories'])
  },
  created () {
    this.fetchCategories()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
