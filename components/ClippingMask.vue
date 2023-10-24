<template>
  <div
    ref="mask-wrap"
    :style="[
      {maskPosition: `${xPosition - maskSize / 2}px ${yPosition - maskSize / 2}px`},
      {maskSize: `${maskSize}px`}
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
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "ClippingMask",
  data() {
    return {
      svgIcon,
      xPosition: 0 as number,
      yPosition: 0 as number,
      peopleStore: usePeopleStore(),
      maskSize: 0
    };
  },
  mounted() {
    window.addEventListener("mousemove", (e) => this.getCursorPosition(e));
    window.addEventListener("mousemove", (e) => this.onHandleMaskSize(e));
    window.addEventListener("wheel", (e) => this.getCursorPosition(e));
  },
  unmounted() {
    window.removeEventListener("mousemove", (e) => this.getCursorPosition(e));
    window.removeEventListener("mousemove", (e) => this.onHandleMaskSize(e));
    window.removeEventListener("wheel", (e) => this.getCursorPosition(e));
  },
  computed: {
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
    },
    onHandleMaskSize(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      if (target.closest(".is-interactable")) {
        this.maskSize = 400;
      } else if (target.closest(".is-clickable")) {
        this.maskSize = 40;
      } else {
        this.maskSize = 20;
      }
    }
  }
});
// todo: closet 으로 clickable, interactable 감지해 size 변경.
// todo: clippingMaskStore 제거
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
  transition:
    background-color 0.3s,
    mask-size 0.3s;
  mask-image: url("public/images/circle.svg");

  .marquee-list {
    pointer-events: none;
  }
}
</style>