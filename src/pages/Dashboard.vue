<template>
  <div class="dashboard">
    <div class="left-trail"></div>
    <div class="main-view">
      <div class="main-view-content">W przygotowaniu</div>
    </div>
    <div class="right-trail"></div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: min-content 1fr min-content;
}

.left-trail {
  width: 300px;
}

.main-view {
}

.main-view-content {
  width: 200px;
  margin: 5rem auto;
}

.right-trail {
  width: 300px;
}
</style>
