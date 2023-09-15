<template>
  <!--  <div :style="{maskImage: `url(${svgIcon.get('maskImage')})`}" class="mask-wrap">-->
  <div
    ref="mask-wrap"
    :style="[
      {
        maskPosition: `calc(${xPosition}px - calc(${store.maskSize}px/2)) calc(${yPosition}px - calc(${store.maskSize}px/2))`
      },
      {maskImage: `url(${svgIcon.get('maskImage')})`},
      {maskSize: `${store.maskSize}px`},
      {backgroundColor: maskBackgroundColor}
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
import {useClippingMaskStore} from "~/stores/ClippingMaskStore";

export default defineComponent({
  name: "ClippingMask",
  data() {
    return {
      svgIcon,
      xPosition: 0 as number,
      yPosition: 0 as number,
      size: 40 as number,
      store: useClippingMaskStore()
    };
  },
  computed: {
    maskBackgroundColor() {
      return this.store.getClickable ? "#ffffff" : "#dddddd";
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
  transition: background-color 0.3s;
}
</style>