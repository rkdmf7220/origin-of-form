<template>
  <div class="wrap">
    <Intro :is-mount="isMount" :show-delayed="showDelayed" />
    <GlobalNav />
    <slot />
  </div>
</template>

<script lang="ts">
import Intro from "~/layouts/intro.vue";
import {defineComponent} from "vue";

interface IIntroData {
  isMount: boolean;
  showDelayed: boolean;
  timeoutId: null | ReturnType<typeof setTimeout>;
}

export default defineComponent({
  name: "default",
  components: {Intro},
  data(): IIntroData {
    return {
      isMount: true,
      showDelayed: true,
      timeoutId: null
    };
  },
  mounted() {
    this.isMount = this.$route.name === "index";
  },
  watch: {
    $route(to, from) {
      if (to.path === "/" && from.path != to.path) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.isMount = true;
        setTimeout(() => this.showDelayed = true, 10);
      } else {
        this.timeoutId = setTimeout(() => this.isMount = false, 500);
        this.showDelayed = false;
      }
    }
  }
});
</script>

<style>
</style>