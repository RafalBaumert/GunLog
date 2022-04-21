<template>
  <div class="application">
    <div class="container">
      <Menu v-if="isAuthenticated" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from './store';
import Menu from '@/components/MainMenu.vue';

export default {
  name: 'App',
  components: { Menu },

  data() {
    return {};
  },

  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
  },
};
</script>

<style>
/* .application {
  height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr max-content;
  grid-template-columns: 1fr;
}

.container {
  margin: 5rem auto;
  width: 600px;
} */
</style>
