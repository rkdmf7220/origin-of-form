<template>
  <div
    ref="mask-wrap"
    :style="[
      {
        maskPosition: `${xPosition - clippingMaskStore.maskSize / 2}px ${yPosition - clippingMaskStore.maskSize / 2}px`
      },
      {maskSize: `${clippingMaskStore.maskSize}px`},
      {backgroundColor: maskBackgroundColor}
    ]"
    id="mask-wrap"
    class="mask-wrap"
  >
    <MarqueeContent />
  </div>
  <!--  <div ref="mask-wrap" id="mask-wrap" class="mask-wrap">-->
  <!--    <MarqueeContent />-->
  <!--  </div>-->
</template>

<script lang="ts">
import svgIcon from "public/images/svgIcon";
import {defineComponent} from "vue";
import {useClippingMaskStore} from "~/stores/ClippingMaskStore";
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "ClippingMask",
  data() {
    return {
      svgIcon,
      xPosition: 0 as number,
      yPosition: 0 as number,
      clippingMaskStore: useClippingMaskStore(),
      peopleStore: usePeopleStore()
    };
  },
  mounted() {
    window.addEventListener("mousemove", (e) => this.getCursorPosition(e));
    window.addEventListener("wheel", (e) => this.getCursorPosition(e));
  },
  computed: {
    maskBackgroundColor() {
      return this.clippingMaskStore.getClickable ? "#ffffff" : "#dddddd";
    },
    isLoaded() {
      return this.peopleStore.isLoaded;
    }
  },
  watch: {
    isLoaded(newValue, oldValue) {
      if (newValue) {
        // setTimeout(() => {});
      }
    }
  },
  methods: {
    getCursorPosition(e: MouseEvent): void {
      // todo: smooth behavior
      this.xPosition = e.pageX;
      this.yPosition = e.pageY;

      // const ref = document.querySelector("#mask-wrap") as HTMLDivElement;
      // ref.style.setProperty("--x", e.pageX - 15 + "px");
      // ref.style.setProperty("--y", e.pageY - 15 + "px");
    }
  }
});
</script>

<style scoped lang="scss">
@import "assets/styles/variables";

.mask-wrap {
  --x: 10px;
  --y: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 150;
  background-color: #fff;
  left: 0;
  top: 0;
  mask-size: 40px;
  mask-repeat: no-repeat;
  mask-origin: content-box;
  mask-position: calc(var(--x)) calc(var(--y));
  pointer-events: none;
  transition: background-color 0.3s;
  mask-image: url("public/images/circle.svg");

  .marquee-list {
    pointer-events: none;
  }
}
</style>