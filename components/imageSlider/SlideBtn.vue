<template>
  <button :style="{maskImage: 'url(' + svgIcon.get(iconType, isTouchDevice) + ')'}" class="slide-btn"></button>
</template>

<script>
import svgIcon from "~/public/images/svgIcon";

export default {
  name: "SlideBtn",
  computed: {
    isTouchDevice() {
      return navigator.maxTouchPoints || "ontouchstart" in document.documentElement ? "Mobile" : "";
    }
  },
  props: {
    iconType: String
  },
  data() {
    return {
      svgIcon
    };
  }
};
</script>

<style scoped></style>