<template>
  <div class="origin-swiper">
    <div
      class="origin-swiper-contents"
      ref="swiper-contents"
      :class="{'is-swipe': isSwipe}"
      :style="[{transform: `translate(${isSwiperPosition.xPosition}px, ${isSwiperPosition.yPosition}px)`}]"
    >
      <div :style="{transform: `scale(${currentZoomScale / 4})`}" ref="people-card-wrap" class="people-card-wrap">
        <template v-if="!isTouchDevice">
          <PeopleCardList @mousedown="(e) => onDragStartSlider(e)" />
        </template>
        <template v-else>
          <PeopleCardList />
        </template>
      </div>
    </div>
    <ZoomIconWrap @change:zoom="applyZoomScale" :current-zoom-scale="currentZoomScale" />
    <template v-if="isTouchDevice">
      <SwiperMoveIconWrap @move:swiper="(direction) => movePositionInMobile(direction)" />
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PeopleCardList from "~/components/origin/PeopleCardList.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {IPosition} from "~/interfaces/PeopleInterface";
import ZoomIconWrap from "~/components/origin/ZoomIconWrap.vue";
import PeopleDetail from "~/components/origin/PeopleDetail.vue";
import SwiperMoveIconWrap from "~/components/origin/SwiperMoveIconWrap.vue";

export default defineComponent({
  name: "PeopleCardSwiper",
  components: {SwiperMoveIconWrap, PeopleDetail, ZoomIconWrap, PeopleCardList},
  props: {
    isTouchDevice: Boolean
  },
  computed: {
    isTouchDevice() {
      return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
    },
    isSwiperPosition() {
      // todo: maximum/minimum position
      return usePeopleStore().swiperPosition;
    },
    swiperMaxWidth(): number {
      // 스와이퍼는 (0, 0) ~ (swiperMaxWidth, swiperMaxHeight)까지 움직일 수 있음
      const peopleCardWrap = this.$refs["people-card-wrap"] as HTMLDivElement;
      const contentsSize = (peopleCardWrap.offsetWidth / 4) * this.currentZoomScale;
      // 회댓값 = 화면 크기 - 배율 반영된 div 크기 - 600(상하단 margin 각 300씩 추가)
      const result = window.innerWidth - contentsSize - 600;
      return result > 0 ? 0 : result;
    },
    swiperMaxHeight(): number {
      const peopleCardWrap = this.$refs["people-card-wrap"] as HTMLDivElement;
      const contentsSize = (peopleCardWrap.offsetHeight / 4) * this.currentZoomScale;
      const result = window.innerHeight - contentsSize - 600;
      return result > 0 ? 0 : result;
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
      currentZoomPositionX: 0 as any,
      currentZoomPositionY: 0 as any,
      currentZoomScale: 2 as number,
      prevZoomScale: 2 as number,
      transitionDuration: 0,
      store: usePeopleStore()
    };
  },
  methods: {
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
      // compute dragged distance
      const moveDragDistanceX = currentPointX! - this.startDragPointX;
      const moveDragDistanceY = currentPointY! - this.startDragPointY;
      // compute dragged position
      let movedDragPositionX = this.currentZoomPositionX + moveDragDistanceX;
      let movedDragPositionY = this.currentZoomPositionY + moveDragDistanceY;
      // compute maximum/minimum X position
      if (movedDragPositionX > 0) {
        movedDragPositionX = 0;
      } else if (movedDragPositionX < this.swiperMaxWidth) {
        movedDragPositionX = this.swiperMaxWidth;
      }
      // compute maximum/minimum Y position
      if (movedDragPositionY > 0) {
        movedDragPositionY = 0;
      } else if (movedDragPositionY < this.swiperMaxHeight) {
        movedDragPositionY = this.swiperMaxHeight;
      }
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
      this.currentZoomPositionX = xPosition;
      this.currentZoomPositionY = yPosition;
    },
    applyZoomScale(zoomOpt: string) {
      // todo: run moveSwiperPosition when zoom scale changes
      const swiperContents = this.$refs["swiper-contents"] as HTMLDivElement;
      swiperContents.style.transitionDuration = "0.3s";
      if (zoomOpt === "zoomIn") {
        this.currentZoomScale++;
      } else {
        this.currentZoomScale--;
      }
      // calc new xy position
      const xPosition = (this.currentZoomPositionX / this.prevZoomScale) * this.currentZoomScale;
      const yPosition = (this.currentZoomPositionY / this.prevZoomScale) * this.currentZoomScale;
      // store new xy position
      this.currentZoomPositionX = xPosition;
      this.currentZoomPositionY = yPosition;
      this.applyMovedSwiperPosition({xPosition, yPosition});
      this.prevZoomScale = this.currentZoomScale;
      setTimeout(() => {
        swiperContents.style.transitionDuration = "0s";
      }, 0.3);
    },
    movePositionInMobile(direction: "top" | "left" | "right" | "bottom") {
      let moveXPosition = 0;
      let moveYPosition = 0;
      switch (direction) {
        case "top":
          moveYPosition = 100;
          break;
        case "right":
          moveXPosition = -100;
          break;
        case "left":
          moveXPosition = 100;
          break;
        case "bottom":
          moveYPosition = -100;
          break;
      }
      this.currentZoomPositionX = this.currentZoomPositionX + moveXPosition;
      this.currentZoomPositionY = this.currentZoomPositionY + moveYPosition;
      const swiperContents = this.$refs["swiper-contents"] as HTMLDivElement;
      swiperContents.style.transition = "translate, 0.3s";
      this.applyMovedSwiperPosition({xPosition: this.currentZoomPositionX, yPosition: this.currentZoomPositionY});
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
    padding: 300px;

    &.is-swipe {
      pointer-events: none;
    }

    .people-card-wrap {
      width: fit-content;
      transition: transform 0.3s;
      transform-style: preserve-3d;
      transform-origin: 0 0;
    }
  }
}
</style>