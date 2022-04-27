<template>
  <div class="application">
    <div class="container">
      <div v-if="isDevBoxVisible">
        <dev-box>state: {{ $store.state }}</dev-box>
      </div>
      <Menu v-if="isAuthenticated" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from './store';

import DevBox from './components/DevBox.vue';
import Menu from '@/components/MainMenu.vue';

export default {
  name: 'App',
  components: { DevBox, Menu },

  data() {
    return {
      isDevBoxVisible: false,
    };
  },

  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
  },

  methods: {
    toggleDevBox(event) {
      if (event.ctrlKey && event.key === 'z') {
        this.isDevBoxVisible = !this.isDevBoxVisible;
      }
    },
  },

  beforeMount() {
    document.addEventListener('keydown', this.toggleDevBox);
  },
};
</script>

<style>
.application {
  width: 100%;
}

.container {
}

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
