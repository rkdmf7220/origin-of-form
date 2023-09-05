<template>
  <div class="marquee-list">
    <div v-for="item in marqueeList" class="marquee-item">
      <div class="marquee-inner">
        <div class="marquee-text-wrapper">
          <span class="marquee-text" v-for="name in item">{{ name }}</span>
          <span class="marquee-text" v-for="name in item">{{ name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";

export default {
  name: "MarqueeContent",
  computed: {
    marqueeList(): string[] {
      return usePeopleStore().marqueeTextList;
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/variables";

.marquee-list {
  height: 90vh;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 2.5em;
  overflow: hidden;

  .marquee-item {
    height: 100%;
    position: relative;
    min-width: 1.35em;
    //animation-duration: 10s;
    //overflow: hidden;

    &:nth-child(odd) .marquee-text-wrapper {
      animation: marquee 30s linear infinite;
    }

    &:nth-child(even) .marquee-text-wrapper {
      bottom: 0;
      animation: marquee-reverse 30s linear infinite;
    }

    .marquee-inner {
      position: relative;
      height: 100%;

      .marquee-text-wrapper {
        //height: 50%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        position: absolute;
        transform: translate3d(0, $MOVE_INITIAL, 0);
        //animation: marquee 5s linear infinite;
      }

      .marquee-text {
        //color: #ffffff;
        color: #4d4d4d;
        font-weight: 700;
        margin-bottom: 20px;
        writing-mode: vertical-lr;
        letter-spacing: 0.1em;
      }
    }
  }
}

@keyframes marquee {
  0% {
    transform: translate3d(0, $MOVE_INITIAL, 0);
  }
  100% {
    transform: translate3d(0, $MOVE_FINAL, 0);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translate3d(0, -$MOVE_INITIAL, 0);
  }
  100% {
    transform: translate3d(0, -$MOVE_FINAL, 0);
  }
}
</style>