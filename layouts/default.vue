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

    <ClippingMask ref="clipping-mask" />
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

interface IClippingData {
  xPosition: number;
  yPosition: number;
  size: string;
}

export default defineComponent({
  name: "default",
  components: {Research, Introduction, Works, Origin, Main},
  mounted() {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    // window.addEventListener("wheel", (e) => preventScroll(e), {passive: false});
    window.addEventListener("mousemove", (e) => this.getCursorPosition(e));
    window.addEventListener("wheel", (e) => this.getCursorPosition(e));
  },
  data() {
    return {
      isMount: true,
      showDelayed: true,
      timeoutId: null,
      showGlobalNav: false
    };
  },
  methods: {
    getCursorPosition(e: MouseEvent): void {
      // todo: smooth behavior
      const clippingMask = this.$refs["clipping-mask"] as IClippingData;
      clippingMask.xPosition = e.pageX;
      clippingMask.yPosition = e.pageY;
    }
  }
});
</script>

<style>
.wrap {
  position: relative;
}
</style>