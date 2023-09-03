<template>
  <ul class="people-card-list">
    <li
      :style="[
        {'grid-column': `${item.order.x}/${item.order.x + 1}`},
        {'grid-row': `${item.order.y}/${item.order.y + 1}`}
      ]"
      v-if="store.peopleList"
      v-for="item in store.peopleList"
    >
      <PeopleCardItem @click="() => onClickCardItem(item)" :item-data="item" :key="item.id" />
    </li>
  </ul>
</template>

<script lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";
import PeopleCardItem from "~/components/origin/PeopleCardItem.vue";
import {IPeople} from "~/interfaces/PeopleInterface";

export default {
  name: "PeopleCardList",
  components: {PeopleCardItem},
  data() {
    return {
      store: usePeopleStore()
    };
  },
  methods: {
    onClickCardItem(item: IPeople) {
      this.store.setSelectedPeopleId(item.id);
      console.log("item id >>", item.id);
    }
  }
};
</script>

<style scoped lang="scss">
.people-card-list {
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-template-rows: repeat(5, 200px);

  li {
    width: 200px;
    height: 200px;
  }
}
</style>