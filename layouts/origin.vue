<template>
  <div ref="origin" @wheel="(e) => onScrollContent(e)" id="origin" class="contents origin-wrap">
    <PeopleCardSwiper />
    <PeopleDetail :show-delayed="showDelayed" :people-data="peopleData" />
  </div>
</template>

<script lang="ts">
import PeopleDetail from "~/components/origin/PeopleDetail.vue";
import PeopleCardSwiper from "~/components/origin/PeopleCardSwiper.vue";
import {defineComponent} from "vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {IPeople} from "~/interfaces/PeopleInterface";
import {defaultPeopleData} from "~/dto/PeopleData";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "origin",
  components: {PeopleDetail, PeopleCardSwiper},
  computed: {
    peopleInfo: function (): IPeople {
      return toRaw(this.store.getPeopleInformation(this.store.selectedPeopleId)) as IPeople;
    },
    selectedPeopleId: function (): string {
      return this.store.selectedPeopleId;
    }
  },
  watch: {
    peopleInfo(newVal) {
      this.showDelayed = !!newVal;
      if (newVal) {
        this.peopleData = newVal;
      } else {
        setTimeout(() => {
          this.peopleData = defaultPeopleData;
        }, 400);
      }
    }
  },
  data() {
    return {
      store: usePeopleStore(),
      peopleId: null as null | string,
      peopleData: defaultPeopleData as IPeople,
      showDelayed: false
    };
  },
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["origin"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Origin, result);
      }
    }
  }
});
</script>

<style scoped lang="scss">
.origin-wrap {
  width: 100%;
  height: 100vh;
  background-color: #131313;
  position: relative;
  overflow: hidden;
}
</style>