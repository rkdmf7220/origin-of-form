<template>
  <div v-if="isMount" :class="{'is-show': showDelayed}" class="intro-container">
    intro section
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "intro",
  props: {
    isMount: Boolean,
    showDelayed: Boolean
  },
})
</script>

<style scoped lang="scss">

.intro-container {
  width: 100%;
  height: 0;
  transition: height 0.3s;
  overflow: hidden;
  background-color: #0cf;

  &.intro-container.is-show {
    height: 100vh;
  }
}
</style>