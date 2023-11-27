<template>
  <div class="swiper-move-btn-wrap">
    <div
      @click="() => onClickMoveBtn('top')"
      :style="{backgroundImage: `url(${svgIcon.get('upIcon')})`}"
      class="slide-btn top-btn"
    ></div>
    <div
      @click="() => onClickMoveBtn('left')"
      :style="{backgroundImage: `url(${svgIcon.get('prevIcon')})`}"
      class="slide-btn left-btn"
    ></div>
    <div
      @click="() => onClickMoveBtn('right')"
      :style="{backgroundImage: `url(${svgIcon.get('nextIcon')})`}"
      class="slide-btn right-btn"
    ></div>
    <div
      @click="() => onClickMoveBtn('bottom')"
      :style="{backgroundImage: `url(${svgIcon.get('downIcon')})`}"
      class="slide-btn bottom-btn"
    ></div>
  </div>
</template>

<script lang="ts">
import svgIcon from "public/images/svgIcon";
import {defineComponent} from "vue";

export default defineComponent({
  name: "SwiperMoveIconWrap",
  data() {
    return {
      svgIcon
    };
  },
  methods: {
    onClickMoveBtn(direction: "top" | "left" | "right" | "bottom") {
      this.$emit("move:swiper", direction);
    }
  }
});
</script>

<style scoped lang="scss">
.swiper-move-btn-wrap {
  width: 100%;
  height: calc(100% - 50px);
  z-index: 30;
  top: 50px;
  left: 0;
  position: absolute;
  pointer-events: none;

  .slide-btn {
    position: absolute;
    pointer-events: auto;
    background-repeat: no-repeat;
    background-position: center;
  }

  .top-btn,
  .bottom-btn {
    width: calc(100% - 80px);
    height: 40px;
    left: 40px;
    right: 40px;
  }

  .left-btn,
  .right-btn {
    width: 40px;
    height: 100%;
    top: 0;
    bottom: 0;
  }

  .top-btn {
    top: 0;
  }

  .bottom-btn {
    bottom: 0;
  }

  .left-btn {
    left: 0;
  }

  .right-btn {
    right: 0;
  }
}
</style>