<template>
  <div class="wrap">
    <Main @scroll.prevent="onHandleScroll" :show-delayed="showDelayed" />
    <GlobalNav />
    <Origin />
    <Works />
    <Introduction />
    <Research />
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Main from "~/layouts/main.vue";
import Origin from "~/layouts/origin.vue";
import Works from "~/layouts/works.vue";
import Introduction from "~/layouts/introduction.vue";
import Research from "~/layouts/research.vue";

interface IIntroData {
  showDelayed: boolean;
  timeoutId: null | ReturnType<typeof setTimeout>;
}

export default defineComponent({
  name: "default",
  components: {Research, Introduction, Works, Origin, Intro},
  data(): IIntroData {
    return {
      showDelayed: true,
      timeoutId: null
    };
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