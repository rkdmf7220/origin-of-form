<template>
  <div v-if="!isLoaded" :class="{'is-loading': showDelayed}" class="loading-wrap">
    <div class="loading-inner">
      <h1 :class="{'show-title': showTitle}">형태의 뿌리</h1>
      <div :class="{'show-loading': showLoading}" class="loader"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "loading",
  props: {
    isLoaded: {
      type: Boolean,
      require: true
    },
    showDelayed: {
      type: Boolean,
      require: true
    }
  },
  mounted() {
    setTimeout(() => (this.showTitle = true), 300);
    setTimeout(() => (this.showLoading = true), 1000);
    setTimeout(() => (this.showLoading = false), 4000);
  },
  data() {
    return {
      loading: false,
      showTitle: false,
      showLoading: false,
      isDone: false
    };
  }
});
</script>

<style scoped lang="scss">
.loading-wrap {
  margin: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 999;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background: linear-gradient(180deg, #1e1e1e 0%, #000 100%), url(/images/noise.svg);

  &.is-loading {
    height: 0;
  }

  .loading-inner {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #fff;
      opacity: 0;
      font-size: 12em;
      transition: opacity 0.3s;

      &.show-title {
        opacity: 1;
      }
    }

    .loader,
    .loader:before,
    .loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
      transition: opacity 0.3s;
      opacity: 0;
    }

    .show-loading {
      &.loader,
      &:before,
      &:after {
        opacity: 1;
      }
    }

    .loader {
      color: #ffffff;
      font-size: 10px;
      margin: 80px auto;
      position: relative;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      top: 0;
    }

    .loader:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .loader:after {
      left: 3.5em;
    }

    @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
    @keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }

    .loading-text-wrap {
      width: 200px;
      height: 185px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: #ffffff;
        font-size: 2em;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .loading-wrap .loading-inner h1 {
    font-size: 4em;
  }
}
</style>