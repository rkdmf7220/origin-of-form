<template>
  <div class="wrap">
    <Intro :is-mount="isMount" :show-delayed="showDelayed"/>
    <GlobalNav/>
    <slot/>
  </div>
</template>

<script lang="ts">
import Intro from "~/layouts/intro.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "default",
  components: {Intro},
  data() {
    return {
      isMount: true,
      showDelayed: true
    }
  },
  mounted() {
    this.isMount = this.$route.name === 'index';
  },
  watch: {
    $route(to, from) {
      if (to.path === '/' && from.path != to.path) {
        this.isMount = true
        setTimeout(() => this.showDelayed = true, 10)
      } else {
        setTimeout(() => this.isMount = false, 500)
        this.showDelayed = false
      }
      console.log('path >>', to.path, from.path)
    }
  }
})
</script>

<style>
@import "assets/styles/reset.css";
</style>