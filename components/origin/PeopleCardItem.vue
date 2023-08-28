<template>
  <div :class="{'is-active': itemData?.id === $route.params.id && isRendered}" class="people-card-item">
    {{ itemData.name }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IPeople} from "~/interfaces/PeopleInterface";

export default defineComponent({
  name: "PeopleCardItem",
  props: {
    itemData: {
      type: Object as () => IPeople
    }
  },
  data() {
    return {
      isRendered: false
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
  border: 1px solid #ffffff;
  box-sizing: border-box;
  background-color: #666666;
  color: white;
  font-size: 2.5em;
  font-weight: 700;
  position: relative;
  transition: all 0.3s;

  &.is-active {
    border-width: 2px;
    z-index: 10;
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
  }

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
  }
}
</style>