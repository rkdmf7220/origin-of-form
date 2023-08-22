<template>
  <div class="origin-wrap">
    <PeopleDetail />
    <PeopleCardList />
  </div>
</template>

<script lang="ts">
import PeopleDetail from "~/components/origin/PeopleDetail.vue";
import PeopleCardList from "~/components/origin/PeopleCardList.vue";

export default {
  name: "[id]",
  components: {PeopleCardList, PeopleDetail}
};
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>