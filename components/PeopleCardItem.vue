<template>
  <div class="people-card-item">
    <NuxtLink :to="`/origin/${itemData?.id}`">
      {{ itemData.name }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IPeople} from "~/interfaces/PeopleInterface";

export default defineComponent({
  name: "PeopleCardItem",
  props: {
    itemData: {
      type: Object as () => IPeople,
    }
  }
})
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

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>