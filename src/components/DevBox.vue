<template>
  <div class="DevBox" @dblclick="handleDoubleClick" v-if="isDevBoxVisible">
    <!-- Put any debugging code you need here  -->
    <pre><slot /></pre>
  </div>
</template>

<script>
export default {
  name: 'DevBox',
  components: {},
  data() {
    return {
      isDevBoxVisible: true,
    };
  },
  computed: {},
  methods: {
    handleDoubleClick() {
      this.isDevBoxVisible = !this.isDevBoxVisible;
    },
  },
};
</script>

<style>
.DevBox {
  background: rgba(20, 20, 20, 0.7);
  position: absolute;
  z-index: 10;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  font-size: 13.5px;
  color: #fff;
  padding: 17px;
}

.DevBox:hover {
  /* opacity: 0.05; */
}
</style>
