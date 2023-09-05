<template>
  <ClientOnly>
    <div :class="[$route.name === 'index' ? '--main' : '--sub', $route.params.id ? 'is-hide' : '']"
         :style="{'top': navPosition + 'px'}" class="nav-menu">
      <ul class="nav-list">
        <li
          :class="[{'is-active': $route.name === item.id}, {'is-active': item.id === 'origin' && $route.name === 'origin-id'}]"
          class="nav-item"
          v-for="item in navData" :key="item.id">
          <NuxtLink :to="item.path">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {INavData} from "~/interfaces/NavigationInterface";

export default defineComponent({
  name: "GlobalNav",
  mounted() {
    this.calcNavPosition();
    addEventListener("resize", this.onResizeNavPosition);
    console.log("route >>", this.$route, toRaw(this.$route.meta));
  },
  unmounted() {
    removeEventListener("resize", this.onResizeNavPosition);
  },
  data() {
    return {
      navData: [
        {
          id: "index",
          title: "메인",
          path: "/"
        },
        {
          id: "origin",
          title: "형태의 뿌리",
          path: "/origin"
        },
        {
          id: "works",
          title: "손원혁 작품",
          path: "/works"
        },
        {
          id: "introduction",
          title: "전시 소개",
          path: "/introduction"
        },
        {
          id: "research",
          title: "연구 결과",
          path: "/research"
        }
      ] as INavData[],
      navPosition: 0
    };
  },
  methods: {
    calcNavPosition() {
      this.navPosition = window.innerHeight - 100;
    },
    onResizeNavPosition() {
      this.calcNavPosition();
    }
  }
});
</script>

<style scoped lang="scss">
.nav-menu {
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 100;
  background-color: rgba(13, 13, 13, 0.1);
  box-sizing: border-box;
  border-bottom: 1px solid #666;
  top: 0;
  transition: top, 0.3s;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.1);
  backdrop-filter: blur(5px);

  &.--main {
    background-color: #131313;
    border-bottom: none;
  }

  &.--sub {
    top: 0 !important;
  }

  &.is-hide {
    top: -100px !important;
  }

  .nav-list {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    .nav-item {
      position: relative;

      &::after {
        content: '';
        width: 0;
        height: 2px;
        transition: all 0.5s ease-in-out;
        position: absolute;
        background-color: #fff;
        bottom: -10px;
        left: 15px;
      }

      &.is-active::after, &:hover::after {
        content: '';
        width: calc(100% - 30px);
        transition: all 0.5s ease-in-out;
      }

      a {
        font-size: 1.25em;
        color: #fff;
        padding: 10px 15px;
        font-weight: 700;
      }
    }
  }
}
</style>