<template>
  <!--  <div :style="{maskImage: `url(${svgIcon.get('maskImage')})`}" class="mask-wrap">-->
  <div
    ref="mask-wrap"
    :style="[
      {maskPosition: `calc(${xPosition}px - 15vh) calc(${yPosition}px - 15vh)`},
      {maskImage: `url(${svgIcon.get('maskImage')})`}
    ]"
    id="mask-wrap"
    class="mask-wrap"
  >
    <MarqueeContent />
  </div>
</template>

<script lang="ts">
import svgIcon from "public/imgs/svgIcon";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ClippingMask",
  mounted() {
    const maskWrap = document.getElementById("mask-wrap") as HTMLDivElement;
    maskWrap.addEventListener("mousemove", (e) => this.getCursorPosition(e));
    // window.addEventListener("mousemove", this.getCursorPosition);
  },
  data() {
    return {
      svgIcon,
      xPosition: 0 as number,
      yPosition: 0 as number
    };
  },
  methods: {
    getCursorPosition(e: MouseEvent): void {
      // todo: smooth behavior
      this.xPosition = e.offsetX;
      this.yPosition = e.offsetY;
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
  z-index: 5;
  background-color: #fff;
  left: 0;
  top: 0;
  mask-size: 30vh;
  mask-repeat: no-repeat;
  mask-origin: content-box;
  mask-position: calc($X - 10vh), calc($Y - 10vh);
}
</style>