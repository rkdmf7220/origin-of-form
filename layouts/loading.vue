<template>
  <div v-if="!isLoaded" :class="{'is-loading': showDelayed}" class="loading-wrap">
    is Loading Layout
  </div>
</template>

<script lang="ts">
export default {
  name: "loading",
  props: {
    isLoaded: {
      type: Boolean,
      require: true
    },
    showDelayed: {
      type: Boolean,
      require: true
    }
  }
};
</script>

<style scoped lang="scss">
.loading-wrap {
  margin: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 127, 255, 1);
  transition: all 0.5s ease-in-out;
  overflow: hidden;

  &.is-loading {
    height: 0;
  }
}
</style>