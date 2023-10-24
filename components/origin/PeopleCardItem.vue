<template>
  <div
    v-if="itemData?.detail"
    :class="[{'is-active': itemData?.id === store.selectedPeopleId && isRendered}]"
    class="people-card-item is-clickable"
  >
    <div
      :style="{backgroundImage: `url(/images/thumbnails/${itemData.thumbnail})`}"
      class="people-card-thumbnail"
    ></div>
  </div>
  <div v-else :class="[{'is-active': itemData?.id === store.selectedPeopleId && isRendered}]" class="people-card-item">
    <div
      :style="[{backgroundImage: `url(/images/thumbnails/${itemData?.thumbnail})`}]"
      class="people-card-thumbnail"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IPeople} from "~/interfaces/PeopleInterface";
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "PeopleCardItem",
  props: {
    itemData: {
      type: Object as () => IPeople
    }
  },
  data() {
    return {
      isRendered: false,
      store: usePeopleStore()
    };
  },
  mounted() {
    setTimeout(() => {
      this.isRendered = true;
    }, 10);
  }
});
</script>

<style scoped lang="scss">
.people-card-item {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  color: #cccccc;
  background-color: #3c3c3c;
  font-size: 2.5em;
  word-break: break-all;
  font-weight: 700;
  position: relative;
  transition: all 0.3s;
  text-align: center;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: inline-block;
    background-color: #dadde3;
    opacity: 0.5;
    mix-blend-mode: multiply;
    transition: opacity 0.3s;
  }

  &.is-clickable::before {
    background-color: #ffdfb6;
  }

  &.is-clickable:hover::before,
  &.is-active::before {
    opacity: 1;
  }

  &.is-active {
    border-width: 2px;
    z-index: 10;
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
  }

  &.is-clickable {
    z-index: 10;
    color: #ffffff;
    background-color: #666666;
    border-color: #ffffff;
  }

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
  }

  .people-card-thumbnail {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    filter: grayscale(95%);
  }
}
</style>