<template>
  <ClientOnly>
    <div
      @wheel="(e) => preventScroll(e)"
      :class="[$route.name === 'index' ? '--main' : '--sub', hideGlobalNav ? 'is-hide' : '']"
      class="nav-menu"
    >
      <ul class="nav-list">
        <li
          :class="[{'is-active': IHash[hashIndex].toLowerCase() === item.id}]"
          class="nav-item is-clickable"
          v-for="(item, index) in navData"
          :key="item.id"
          @click="() => onClickNav(index)"
        >
          <a :href="item.path">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {INavData} from "~/interfaces/NavigationInterface";
import {usePeopleStore} from "~/stores/PeopleStore";
import {useWorksStore} from "~/stores/WorksStore";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "GlobalNav",
  computed: {
    IHash() {
      return IHash;
    },
    hideGlobalNav(): boolean {
      return !!this.store.selectedPeopleId || !!this.worksStore.sliderState;
    }
  },
  props: {
    hashIndex: Number
  },
  data() {
    return {
      navData: [
        // {
        //   id: "index",
        //   title: "메인",
        //   path: "#"
        // },
        {
          id: "introduction",
          title: "전시 소개",
          path: "#introduction"
        },
        {
          id: "origin",
          title: "형태의 뿌리",
          path: "#origin"
        },
        {
          id: "works",
          title: "손원혁 작품",
          path: "#works"
        },
        {
          id: "research",
          title: "연구 결과",
          path: "#research"
        }
      ] as INavData[],
      store: usePeopleStore(),
      worksStore: useWorksStore()
    };
  },
  methods: {
    onClickNav(index: number) {
      this.$emit("change-index", index);
    },
    preventScroll(e: MouseEvent) {
      e.preventDefault();
    }
  }
});
</script>

<style scoped lang="scss">
.nav-menu {
  width: 100%;
  height: 100px;
  position: sticky;
  z-index: 100;
  background-color: rgba(13, 13, 13, 0.1);
  border-bottom: 1px solid #666;
  top: 0;
  transition: top, 0.3s;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.1);
  backdrop-filter: blur(5px);

  &.--main {
    background-color: #131313;
    border-bottom: none;
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
        content: "";
        width: 0;
        height: 2px;
        transition: all 0.5s ease-in-out;
        position: absolute;
        background-color: #fff;
        bottom: -10px;
        left: 15px;
      }

      &.is-active::after,
      &:hover::after {
        content: "";
        width: calc(100% - 30px);
        transition: all 0.5s ease-in-out;
      }

      a {
        font-size: 1.25em;
        color: #fff;
        padding: 10px 15px;
        font-weight: 700;
        cursor: none;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .nav-menu {
    height: 50px;

    .nav-list .nav-item {
      width: 25%;

      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 1em;
        padding: 0;
      }
    }
  }
}
</style>