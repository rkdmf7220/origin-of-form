<template>
  <div class="origin-wrap">
    <PeopleCardList/>
  </div>
</template>

<script lang="ts">
import PeopleCardList from "~/components/PeopleCardList.vue";

export default {
  name: "index",
  components: {PeopleCardList}
}
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>
