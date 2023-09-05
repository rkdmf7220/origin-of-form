<template>
  <div class="origin-wrap">
    <PeopleCardSwiper />
  </div>
</template>

<script lang="ts">
import PeopleCardSwiper from "~/components/origin/PeopleCardSwiper.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {defineComponent} from "vue";

export default defineComponent({
  name: "index",
  components: {PeopleCardSwiper},
  data() {
    return {
      store: usePeopleStore()
    };
  },
  async mounted() {
    if (Object.keys(this.store.swiperPosition).length === 0) {
      await this.store.setSwiperPosition(50, 50);
    }
  }
});
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
}
</style>
