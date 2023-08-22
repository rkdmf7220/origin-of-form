<template>
  <div class="origin-wrap">
    <PeopleCardSwiper />
  </div>
</template>

<script lang="ts">
import PeopleCardSwiper from "~/components/origin/PeopleCardSwiper.vue";

export default {
  name: "index",
  components: {PeopleCardSwiper}
};
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>
