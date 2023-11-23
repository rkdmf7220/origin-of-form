<template>
  <div class="countdown-wrap">
    <div class="countdown-inner">
      <h2>형태의 뿌리...</h2>
      <ul class="countdown-list">
        <li
          v-for="(item, index) in timer"
          :key="index"
          :class="{'date-item': item.title === '일'}"
          class="countdown-item"
        >
          <div class="countdown-time">{{ item.value }}</div>
          <div class="countdown-time-text">{{ item.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Countdown",
  mounted() {
    this.runTimer();
    this.intervalId = setInterval(this.runTimer, 1000);
  },
  unmounted() {
    clearInterval(this.intervalId);
  },
  data() {
    return {
      timer: {
        date: {title: "일", value: null as null | number},
        hour: {title: "시", value: null as null | number | string},
        minute: {title: "분", value: null as null | number | string},
        second: {title: "초", value: null as null | number | string}
      },
      intervalId: null as any
    };
  },
  methods: {
    runTimer() {
      const opening = new Date("2023-11-29").valueOf();
      const now = new Date().valueOf();
      const diff = opening - now;

      const date = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor(diff / 1000);

      this.timer.date.value = date;
      // this.timer.hour.value = hours - date * 24;
      // this.timer.minute.value = minutes - hours * 60;
      // this.timer.second.value = seconds - minutes * 60;
      this.timer.hour.value = (hours - date * 24).toString().padStart(2, "0");
      this.timer.minute.value = (minutes - hours * 60).toString().padStart(2, "0");
      this.timer.second.value = (seconds - minutes * 60).toString().padStart(2, "0");
    }
  }
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

  .countdown-inner {
    h2 {
      text-align: center;
    }

    .countdown-list {
      display: flex;
      padding: 30px 0 60px;
      gap: 50px;

      .countdown-item {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;

        .countdown-time {
          width: 100px;
          padding: 40px 0;
          text-align: center;
          border: 1px solid #3c3f45;
          border-radius: 5px;
          background-color: #171818;
          box-shadow:
            inset 5px 5px 13px rgba(0, 0, 0, 0.5),
            inset -3px -3px 8px rgba(255, 255, 255, 0.15);
          font-size: 2.5rem;
        }

        .countdown-time-text {
          font-size: 1.5rem;
        }

        &.date-item .countdown-time {
          width: 80px;
        }
      }
    }
  }
}
</style>