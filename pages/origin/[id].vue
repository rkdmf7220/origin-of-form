<template>
  <div class="origin-wrap">
    <PeopleDetail/>
    <PeopleCardList/>
  </div>
</template>

<script lang="ts">
import PeopleDetail from "~/components/PeopleDetail.vue";
import PeopleCardList from "~/components/PeopleCardList.vue";

export default {
  name: "[id]",
  components: {PeopleCardList, PeopleDetail}
}
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>