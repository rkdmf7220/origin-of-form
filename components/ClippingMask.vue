<template>
  <!--  <div :style="{maskImage: `url(${svgIcon.get('maskImage')})`}" class="mask-wrap">-->
  <div
    ref="mask-wrap"
    :style="[
      {
        maskPosition: `calc(${xPosition}px - calc(${size}px/2)) calc(${yPosition}px - calc(${size}px/2))`
      },
      {maskImage: `url(${svgIcon.get('maskImage')})`},
      {maskSize: `${size}px`}
    ]"
    id="mask-wrap"
    class="mask-wrap"
  >
    <MarqueeContent @hover="(value) => setMaskSize(value)" />
  </div>
</template>

<script lang="ts">
import svgIcon from "public/imgs/svgIcon";
import {defineComponent} from "vue";

let intervalId: number | undefined;

export default defineComponent({
  name: "ClippingMask",
  data() {
    return {
      svgIcon,
      xPosition: 0 as number,
      yPosition: 0 as number,
      size: 40 as number
    };
  },
  methods: {
    setMaskSize(value: string): void {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
      intervalId = window.setInterval(() => {
        if (value === "enter" && this.size < 400) {
          this.size = this.size + 4;
        } else if (value === "leave" && this.size > 40) {
          this.size = this.size - 4;
        } else {
          window.clearInterval(intervalId);
          intervalId = undefined;
        }
      }, 1);
    }
  }
});
</script>

<style scoped lang="scss">
@import "assets/styles/variables";

$X: 0px;
$Y: 0px;

.mask-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 150;
  background-color: #fff;
  left: 0;
  top: 0;
  mask-size: 30px;
  mask-repeat: no-repeat;
  mask-origin: content-box;
  mask-position: calc($X - 10vh), calc($Y - 10vh);
  pointer-events: none;
}
</style>