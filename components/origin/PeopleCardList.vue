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
      /*if (item.detail) {
        this.store.setSelectedPeopleId(item.id);
      } else {
        this.store.setSelectedPeopleId(null);
      }*/
      item.detail ? this.store.setSelectedPeopleId(item.id) : this.store.setSelectedPeopleId(null);
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/variables";

.people-card-list {
  width: fit-content;
  display: grid;
  grid-template-columns: repeat($CARD_COLUMNS, 200px);
  grid-template-rows: repeat($CARD_ROWS, 200px);

  li {
    width: 200px;
    height: 200px;
  }
}
</style>