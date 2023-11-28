<template>
  <div class="swiper-move-btn-wrap">
    <div @click="() => onClickMoveBtn('top')" class="slide-btn top-btn">
      <div :style="{backgroundImage: `url(${svgIcon.get('upIcon')})`}" class="btn-icon"></div>
    </div>
    <div @click="() => onClickMoveBtn('left')" class="slide-btn left-btn">
      <div :style="{backgroundImage: `url(${svgIcon.get('prevIcon')})`}" class="btn-icon"></div>
    </div>
    <div @click="() => onClickMoveBtn('right')" class="slide-btn right-btn">
      <div :style="{backgroundImage: `url(${svgIcon.get('nextIcon')})`}" class="btn-icon"></div>
    </div>
    <div @click="() => onClickMoveBtn('bottom')" class="slide-btn bottom-btn">
      <div :style="{backgroundImage: `url(${svgIcon.get('downIcon')})`}" class="btn-icon"></div>
    </div>
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
  height: 100%;
  z-index: 30;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;

  .slide-btn {
    position: absolute;
    pointer-events: auto;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn-icon {
      width: 40px;
      height: 40px;
    }
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
    height: calc(100% - 80px);
    top: 40px;
    bottom: 40px;
  }

  .top-btn {
    top: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 75%
    );
  }

  .bottom-btn {
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 75%
    );
  }

  .left-btn {
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 75%
    );
  }

  .right-btn {
    right: 0;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 75%
    );
  }
}
</style>