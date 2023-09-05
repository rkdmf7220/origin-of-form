<template>
  <div class="origin-wrap">
    <PeopleDetail />
    <PeopleCardSwiper />
  </div>
</template>

<script lang="ts">
import PeopleDetail from "~/components/origin/PeopleDetail.vue";
import PeopleCardSwiper from "~/components/origin/PeopleCardSwiper.vue";
import {defineComponent} from "vue";
import {usePeopleStore} from "~/stores/PeopleStore";

export default defineComponent({
  name: "[id]",
  components: {PeopleDetail, PeopleCardSwiper},
  data() {
    return {
      store: usePeopleStore()
    };
  },
  async mounted() {
    if (Object.keys(this.store.swiperPosition).length === 0) {
      const found = this.store.peopleList.find((item) => (item.id === this.$route.params.id));
      await this.store.setSwiperPosition(found!.order.x * 100, found!.order.y * 100);
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