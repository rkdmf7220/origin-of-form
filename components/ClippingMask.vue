<template>
  <div
    v-if="!isTouchDevice"
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
  <div
    v-else
    ref="mask-wrap"
    :style="[
      {
        maskPosition: `${this.mobileMask.xPosition - this.mobileMask.diameter / 2}px ${
          this.mobileMask.yPosition - this.mobileMask.diameter / 2
        }px`
      },
      {maskSize: `${this.mobileMask.diameter}px`}
    ]"
    id="mask-wrap"
    class="mask-wrap"
  >
    <MarqueeContent :is-touch-device="isTouchDevice" />
  </div>
  <!--  <div ref="mask-wrap" id="mask-wrap" class="mask-wrap">-->
  <!--    <MarqueeContent />-->
  <!--  </div>-->
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "ClippingMask",
  mounted() {
    if (!this.isTouchDevice) {
      window.addEventListener("mousemove", (e) => this.getCursorPosition(e));
      window.addEventListener("mousemove", (e) => this.onHandleMaskSize(e));
      window.addEventListener("wheel", (e) => this.getCursorPosition(e));
    } else {
      this.onSetMaskInMobile();
      this.animate(this.animate.bind(this));
    }
  },
  unmounted() {
    if (!this.isTouchDevice) {
      window.removeEventListener("mousemove", (e) => this.getCursorPosition(e));
      window.removeEventListener("mousemove", (e) => this.onHandleMaskSize(e));
      window.removeEventListener("wheel", (e) => this.getCursorPosition(e));
    } else {
    }
  },
  props: {
    isTouchDevice: Boolean
  },
  computed: {
    isLoaded(): boolean {
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
  data() {
    return {
      xPosition: 0 as number,
      yPosition: 0 as number,
      peopleStore: usePeopleStore(),
      maskSize: 0 as number,
      animationCancelled: false as boolean,
      cursorClosest: null as null | "interactable" | "clickable",
      mobileMask: {
        xPosition: 0 as number,
        yPosition: 0 as number,
        vx: 1,
        vy: 1,
        radius: 100,
        diameter: 200,
        stageWidth: 0,
        stageHeight: 0
      }
    };
  },
  methods: {
    getCursorPosition(e: MouseEvent): void {
      this.xPosition = e.pageX;
      this.yPosition = e.pageY;
    },
    onHandleMaskSize(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      let targetClosest: null | "interactable" | "clickable";
      const oldMaskSize = this.maskSize;
      let newMaskSize: number;
      if (target.closest(".is-interactable")) {
        newMaskSize = 400;
        targetClosest = "interactable";
      } else if (target.closest(".is-clickable")) {
        newMaskSize = 40;
        targetClosest = "clickable";
      } else {
        newMaskSize = 20;
        targetClosest = null;
      }
      if (targetClosest === this.cursorClosest) {
        return;
      } else {
        this.animationCancelled = true;
        this.cursorClosest = targetClosest;
        this.maskSizeAnimate(oldMaskSize, newMaskSize);
      }
    },
    easeInOutSine(x: number): number {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    },
    maskSizeAnimate(startValue: number, endValue: number) {
      this.animationCancelled = false;
      const startTime = Date.now();
      const duration = 300;
      const step = () => {
        if (this.animationCancelled) {
          return;
        }
        const currentTime = Date.now() - startTime;
        if (currentTime < duration) {
          const progress = this.easeInOutSine(currentTime / duration);
          this.maskSize = startValue + (endValue - startValue) * progress;
          requestAnimationFrame(step);
        } else {
          this.maskSize = endValue;
        }
      };
      step();
    },
    onSetMaskInMobile() {
      this.mobileMask.stageWidth = window.innerWidth;
      this.mobileMask.stageHeight = window.innerHeight;
      this.mobileMask.xPosition = 80 + Math.floor(Math.random() * (this.mobileMask.stageWidth - 160));
      // (최솟값 + 보정값 10)  +  Math.floor(화면 크기 -
      this.mobileMask.yPosition = 80 + Math.floor(Math.random() * (this.mobileMask.stageHeight - 160));
    },
    moveMask() {
      this.mobileMask.xPosition += this.mobileMask.vx;
      this.mobileMask.yPosition += this.mobileMask.vy;
      this.bounceWindow();
    },
    bounceWindow() {
      if (!this.mobileMask.stageWidth && !this.mobileMask.stageHeight) return;
      const minX = this.mobileMask.radius - 30;
      const maxX = this.mobileMask.stageWidth - this.mobileMask.radius + 30;
      const minY = this.mobileMask.radius - 30;
      const maxY = this.mobileMask.stageHeight - this.mobileMask.radius - 20;
      // 세로 - 원 지름 + 보정 30 - GNB 5
      if (this.mobileMask.xPosition <= minX || this.mobileMask.xPosition >= maxX) {
        this.mobileMask.vx *= -1;
        this.mobileMask.stageHeight += this.mobileMask.vx;
      }
      if (this.mobileMask.yPosition <= minY || this.mobileMask.yPosition >= maxY) {
        this.mobileMask.vy *= -1;
        this.mobileMask.yPosition += this.mobileMask.vy;
      }
    },
    animate(t: any) {
      window.requestAnimationFrame(this.animate.bind(this));
      this.moveMask();
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

@media screen and (max-width: 767px) {
  .mask-wrap {
    height: calc(100vh - 50px);
  }
}
</style>