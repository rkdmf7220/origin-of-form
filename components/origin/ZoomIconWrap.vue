<template>
  <div class="zoom-btn-wrap">
    <button
      :class="{'is-disable': currentZoomScale === 6}"
      :style="{backgroundImage: `url(${svgIcon.get('zoomInIcon')})`}"
      @click="onclickZoomBtn('zoomIn')"
      class="zoom-btn zoom-in-btn"
    ></button>
    <span class="zoom-scale">{{ currentZoomScale * 25 + "%" }}</span>
    <button
      :class="{'is-disable': currentZoomScale === 2}"
      :style="{backgroundImage: `url(${svgIcon.get('zoomOutIcon')})`}"
      @click="onclickZoomBtn('zoomOut')"
      class="zoom-btn zoom-out-btn"
    ></button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import svgIcon from "public/imgs/svgIcon";

export default defineComponent({
  name: "ZoomIconWrap",
  props: {
    currentZoomScale: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      svgIcon
    };
  },
  methods: {
    onclickZoomBtn(zoomOpt: string) {
      this.$emit("change:zoom", zoomOpt);
    }
  }
});
</script>

<style scoped lang="scss">
$BUTTON_SIZE: 40px;
$BORDER_COLOR: #777777;

.zoom-btn-wrap {
  position: absolute;
  left: 50px;
  bottom: 50px;
  height: $BUTTON_SIZE;
  display: flex;
  align-items: center;
  background-color: #333333;
  border: 1px solid $BORDER_COLOR;
  color: #fff;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 5px 10px rgba(255, 255, 255, 0.15);

  .zoom-btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    transition: opacity 0.3s;

    &.is-disable {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  .zoom-scale {
    padding: 0 16px;
    position: relative;
    line-height: $BUTTON_SIZE;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: $BORDER_COLOR;
      top: 0;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }
}
</style>