<template>
  <div
    :class="[{'is-active': itemData?.id === store.selectedPeopleId && isRendered}, {'is-clickable': itemData?.detail}]"
    class="people-card-item"
  >
    {{ itemData.name }}
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
  border: 1px solid #dddddd;
  box-sizing: border-box;
  color: #cccccc;
  background-color: #3c3c3c;
  font-size: 2.5em;
  word-break: break-all;
  font-weight: 700;
  position: relative;
  transition: all 0.3s;
  text-align: center;
  padding: 5px;

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
}
</style>