<template>
  <div class="wrap">
    <Main :show-delayed="showDelayed" />
    <!--    <Main @scroll.prevent="onHandleScroll" :show-delayed="showDelayed" />-->
    <div>
      <GlobalNav />
      <Origin />
      <Works />
      <Introduction />
      <Research />
    </div>
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

export default defineComponent({
  name: "default",
  components: {Research, Introduction, Works, Origin, Main},
  mounted() {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    // window.addEventListener("wheel", (e) => preventScroll(e), {passive: false});
  },
  data() {
    return {
      isMount: true,
      showDelayed: true,
      timeoutId: null,
      showGlobalNav: false
    };
  }
});
</script>

<style></style>