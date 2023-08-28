<template>
  <div class="origin-swiper">
    <div class="origin-swiper-contents"
         ref="swiper-contents"
         :class="[{'is-grabbing': isMouseDown}, {'is-swipe': isSwipe}]"
         :style="{'transform': `translate(${isSwiperPosition.xPosition}px, ${isSwiperPosition.yPosition}px)`}"
         @mousedown="(e) => onDragStartSlider(e)"
    >
      <PeopleCardList />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PeopleCardList from "~/components/origin/PeopleCardList.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {IPosition} from "~/interfaces/PeopleInterface";

export default defineComponent({
  name: "PeopleCardSwiper",
  components: {PeopleCardList},
  computed: {
    isTouchDevice() {
      return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
    },
    isSwiperPosition() {
      // todo: maximum/minimum position
      return usePeopleStore().swiperPosition;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.onDragSwiper);
    window.addEventListener("mouseup", (e) => this.onDropSwiper(e));
  },
  unmounted() {
    window.removeEventListener("mousemove", this.onDragSwiper);
    window.removeEventListener("mouseup", (e) => this.onDropSwiper(e));
  },
  data() {
    return {
      isMouseDown: false,
      isSwipe: false,
      isPreventTransition: true,
      startDragPointX: 0 as number,
      startDragPointY: 0 as number,
      currentZoomPositionX: 0,
      currentZoomPositionY: 0,
      prevZoomScale: 0 as number,
      store: usePeopleStore()
    };
  },
  methods: {
    // todo: swiperStore 만들어서 좌표를 store에 저장하는 방식 사용.
    // todo: swiper 이동 한계 구현
    applyMovedSwiperPosition({xPosition, yPosition}: IPosition) {
      const swiperContents = this.$refs["swiper-contents"] as HTMLDivElement;
      swiperContents.style.transform = `translate(${xPosition}px, ${yPosition}px)`;
    },
    onDragStartSlider(e: MouseEvent) {
      this.isMouseDown = true;
      this.isPreventTransition = true;
      this.startDragPointX = e.clientX;
      this.startDragPointY = e.clientY;
      this.calcSwipePosition(e);
    },
    onDragSwiper(e: MouseEvent | TouchEvent) {
      if (!this.isMouseDown) {
        return;
      }
      if (!this.isSwipe) {
        this.isSwipe = true;
      }
      this.moveSwiperPosition(e);
    },
    calcSwipePosition(e: MouseEvent | TouchEvent): IPosition {
      let currentPointX: number | undefined;
      let currentPointY: number | undefined;
      // compute current point
      if (this.isTouchDevice && e instanceof TouchEvent) {
        currentPointX = e.touches[0].clientX;
        currentPointY = e.touches[0].clientY;
      } else if (!this.isTouchDevice && e instanceof MouseEvent) {
        currentPointX = e.clientX;
        currentPointY = e.clientY;
      }
      // compute drag distance
      const moveDragDistanceX = currentPointX! - this.startDragPointX;
      const moveDragDistanceY = currentPointY! - this.startDragPointY;
      const movedDragPositionX = this.currentZoomPositionX + moveDragDistanceX;
      const movedDragPositionY = this.currentZoomPositionY + moveDragDistanceY;
      // const movedDragPositionX = this.store.swiperPosition.xPosition + moveDragDistanceX;
      // const movedDragPositionY = this.store.swiperPosition.yPosition + moveDragDistanceY;
      // todo: maximum/minimum position
      console.log("result >>", currentPointX, currentPointY, this.startDragPointX, this.startDragPointY, moveDragDistanceX, moveDragDistanceY, movedDragPositionX, movedDragPositionY);
      return {xPosition: movedDragPositionX, yPosition: movedDragPositionY};
    },
    moveSwiperPosition(e: MouseEvent | TouchEvent) {
      const {xPosition, yPosition} = this.calcSwipePosition(e);
      this.applyMovedSwiperPosition({xPosition, yPosition});
    },
    onDropSwiper(e: MouseEvent | TouchEvent) {
      if (!this.isMouseDown) return;
      this.saveSwiperPosition(e);
    },
    saveSwiperPosition(e: MouseEvent | TouchEvent) {
      this.isMouseDown = false;
      this.isSwipe = false;
      const {xPosition, yPosition} = this.calcSwipePosition(e);
      // this.store.setSwiperPosition(xPosition, yPosition);
      this.currentZoomPositionX = xPosition;
      this.currentZoomPositionY = yPosition;
    }
  }
});
</script>

<style scoped lang="scss">
.origin-swiper {
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .origin-swiper-contents {
    padding: 100px;
    cursor: grab;

    &.is-grabbing {
      cursor: grabbing;
    }

    &.is-swipe {
      pointer-events: none;
    }
  }
}
</style>