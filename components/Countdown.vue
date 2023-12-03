<template>
  <div class="countdown-wrap">
    <div class="countdown-inner">
      <h2>형태의 뿌리</h2>
      <h4>Coming soon...</h4>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Countdown"
});
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

.countdown-wrap {
  font-family: "Pretendard", sans-serif;
  font-weight: 200;
  color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #1e1e1e 0%, #000 100%), url(/images/noise.svg);
  cursor: default;

  h2,
  h4 {
    text-align: center;
  }
}
</style>