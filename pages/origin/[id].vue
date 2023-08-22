<template>
  <div class="origin-wrap">
    <PeopleDetail />
    <PeopleCardSwiper />
  </div>
</template>

<script lang="ts">
import PeopleDetail from "~/components/origin/PeopleDetail.vue";
import PeopleCardSwiper from "~/components/origin/PeopleCardSwiper.vue";

export default {
  name: "[id]",
  components: {PeopleDetail, PeopleCardSwiper}
};
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>