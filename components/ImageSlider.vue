<template>
  <div
    :class="{'is-show': this.store.sliderState}"
    :style="{opacity: this.store.sliderState ? 1 : 0}"
    ref="image-slider"
    class="image-slider"
  >
    <SlideInner
      @decrease:index="decreaseCurrentIndex"
      @increase:index="increaseCurrentIndex"
      @close:slider="closeSlider"
      @change:zoom="changeZoomScale"
      ref="slide-inner"
      :img-list="imgList"
      :current-index="store.listIndex + 1"
      :pinch-zoom="pinchZoom"
      :pinch-zoom-scale="pinchZoomScale"
    />
    <SlideToolbar
      @close:slider="closeSlider"
      @change:zoom="(zoomType) => changeZoomScale(zoomType)"
      :max-index="maxIndex"
      :current-index="store.listIndex + 1"
      :pinch-zoom="pinchZoom"
      :pinch-zoom-scale="pinchZoomScale"
    />
    <div class="slide-dim"></div>
  </div>
</template>

<script>
import SlideToolbar from "./imageSlider/SlideToolbar.vue";
import SlideInner from "./imageSlider/SlideInner.vue";
import {useWorksStore} from "~/stores/WorksStore";

export default {
  name: "ImageSlider",
  components: {SlideInner, SlideToolbar},
  props: {
    imgList: Array
  },
  computed: {
    slideTranslatePosition() {
      return (this.store.listIndex - 1) * -document.body.clientWidth;
    },
    maxIndex() {
      return this.imgList?.length;
    },
    isTouchDevice() {
      return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
    }
  },
  beforeUnmount() {
    if (this.$refs["slide-inner"].isTouchDevice) {
      this.$refs["image-slider"].removeEventListener("touchstart", this.$refs["slide-inner"].onSwipeStartSlider);
      this.$refs["image-slider"].removeEventListener("touchmove", this.$refs["slide-inner"].onHandleSwipeDirect);
      this.$refs["image-slider"].removeEventListener("touchmove", this.$refs["slide-inner"].onSwipeSlider);
      this.$refs["image-slider"].removeEventListener("touchend", this.$refs["slide-inner"].onDropSlider);
    }
  },
  data() {
    return {
      sliderOpacity: 0,
      pinchZoom: false,
      pinchZoomScale: 1,
      store: useWorksStore()
    };
  },
  methods: {
    decreaseCurrentIndex() {
      this.store.decreaseListIndex();
    },
    increaseCurrentIndex() {
      this.store.increaseListIndex();
    },
    changeZoomScale(zoomType) {
      this.$refs["slide-inner"].prevZoomScale = this.pinchZoomScale;
      if (zoomType === "zoom-out") {
        this.$refs["slide-inner"].isPreventTransition = false;
        this.pinchZoomScale--;
      } else if (zoomType === "zoom-in") {
        this.$refs["slide-inner"].isPreventTransition = false;
        this.pinchZoomScale++;
      } else if (zoomType === "reset") {
        this.pinchZoomScale = 1;
        /*        this.$nextTick(() => {
                  this.setZoomMode()
                  this.$refs["slide-inner"].resetZoomScale(this.pinchZoomScale);
                })
                return*/
      }
      // this.$refs["slide-inner"].isDrag = false;
      if (this.pinchZoomScale === 1 && this.pinchZoom) {
        this.$nextTick(() => {
          this.setZoomMode();
          this.$refs["slide-inner"].resetZoomScale();
        });
      } else {
        this.$nextTick(() => {
          this.setZoomMode();
          this.$refs["slide-inner"].applyZoomScale();
        });
      }
    },
    setZoomMode() {
      this.pinchZoomScale > 1 ? (this.pinchZoom = true) : (this.pinchZoom = false);
    },
    closeSlider() {
      this.sliderOpacity = 0;
      this.$refs["slide-inner"].isPreventTransition = true;
      this.changeZoomScale("reset");
      this.store.hideSlider();
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/image-slider";
</style>