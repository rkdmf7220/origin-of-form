<template>
  <div :class="{'is-show': showDelayed}" class="main-container">
    <MarqueeContent />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MarqueeContent from "~/components/MarqueeContent.vue";
import ClippingMask from "~/components/ClippingMask.vue";

export default defineComponent({
  name: "main",
  components: {MarqueeContent, ClippingMask},
  props: {
    showDelayed: Boolean
  }
});
</script>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 0;
  transition: height 0.3s;
  overflow: hidden;
  position: relative;
  background: linear-gradient(180deg, #1e1e1e 0%, #000 100%), url(https://grainy-gradients.vercel.app/noise.svg);

  &.main-container.is-show {
    height: 90vh;
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(180deg, rgba(30, 30, 30, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%),
      url(https://grainy-gradients.vercel.app/noise.svg);
    mix-blend-mode: lighten;
    opacity: 0.7;
  }
}
</style>