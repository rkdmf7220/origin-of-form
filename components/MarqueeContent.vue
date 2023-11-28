<template>
  <div :class="{'is-loaded': isLoaded}" class="marquee-list is-interactable">
    <template v-if="isTouchDevice">
      <div v-for="index in checkMobileWidth" class="marquee-item-wrap">
        <div v-for="item in marqueeList" class="marquee-item" :key="index">
          <div class="marquee-inner">
            <div class="marquee-text-wrapper">
              <div class="marquee-text-list" v-for="index in 2">
                <span :key="index" class="marquee-text" v-for="name in item">
                  {{ name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="index in 3" class="marquee-item-wrap">
        <div v-for="item in marqueeList" class="marquee-item" :key="index">
          <div class="marquee-inner">
            <div class="marquee-text-wrapper">
              <div class="marquee-text-list" v-for="index in 2">
                <span :key="index" class="marquee-text" v-for="name in item">
                  {{ name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "MarqueeContent",
  props: {
    isTouchDevice: Boolean
  },
  data() {
    return {
      store: usePeopleStore(),
      isLoaded: false
    };
  },
  computed: {
    marqueeList(): string[] {
      return this.store.marqueeTextList;
    },
    peopleLoaded(): boolean {
      return this.store.isLoaded;
    },
    checkMobileWidth(): number {
      const width = window.outerWidth;
      let count;
      if (width < 768) {
        count = 1;
      } else if (width >= 768 && width < 1024) {
        count = 2;
      } else {
        count = 3;
      }
      return count;
    }
  },
  watch: {
    // peopleLoaded(newValue, oldValue) {
    //   if (newValue) {
    //     setTimeout(() => {
    //       this.isLoaded = true;
    //     }, 500);
    //   }
    // }
    peopleLoaded: function (newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.isLoaded = true;
        }, 500);
      }
    }
  }
});
</script>

<style scoped lang="scss">
@import "assets/styles/variables";
@import "assets/styles/default";

.marquee-list {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: row;
  font-size: 2.5em;
  overflow: hidden;
  pointer-events: auto;
  justify-content: center;
  font-family: "KOTRA Bold", sans-serif;
  font-weight: bold;

  .marquee-item-wrap {
    display: flex;
    padding-bottom: 20px;
  }

  .marquee-item {
    height: 100%;
    position: relative;
    min-width: 1.35em;
    padding: 0 10px;
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
        //font-weight: bold;
        writing-mode: vertical-lr;
        letter-spacing: 0.1em;
      }
    }
  }
}

.mask-wrap .marquee-item .marquee-inner .marquee-text {
  color: #000;
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

@media screen and (max-width: 767px) {
  .marquee-list {
    height: calc(100vh - 50px);
  }
}
</style>