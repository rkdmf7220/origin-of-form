<template>
  <!--  <template v-if="!isOpen">-->
  <template v-if="false">
    <Countdown />
  </template>
  <template v-else>
    <div @wheel="(e) => onScrollWrap(e)" class="wrap">
      <Main @change-hash="changeHash" :is-touch-device="isTouchDevice" />
      <!--    <Main :show-delayed="showDelayed" />-->
      <div>
        <GlobalNav @change-index="setIndex" :hash-index="hashIndex" />
        <Introduction @change-hash="changeHash" />
        <Origin @change-hash="changeHash" :is-touch-device="isTouchDevice" />
        <Works @change-hash="changeHash" :is-touch-device="isTouchDevice" />
        <Research @change-hash="changeHash" :is-touch-device="isTouchDevice" />
      </div>
      <Credit @change-hash="changeHash" />

      <ClippingMask ref="clipping-mask" :is-touch-device="isTouchDevice" />
      <slot />
    </div>
  </template>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Main from "~/layouts/main.vue";
import Introduction from "~/layouts/introduction.vue";
import Origin from "~/layouts/origin.vue";
import Works from "~/layouts/works.vue";
import Research from "~/layouts/research.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {useWorksStore} from "~/stores/WorksStore";
import {IHash} from "~/interfaces/IHash";
import Credit from "~/layouts/credit.vue";

export default defineComponent({
  name: "default",
  components: {Credit, Research, Introduction, Works, Origin, Main},
  computed: {
    isTouchDevice() {
      return !!(navigator.maxTouchPoints || "ontouchstart" in document.documentElement);
    }
  },
  mounted() {
    const hashData = window.location.hash;
    const hashEnum = hashData.replace("#", "").charAt(0).toUpperCase() + hashData.replace("#", "").slice(1);
    this.hashIndex = hashEnum ? IHash[hashEnum as keyof typeof IHash] : IHash.Main;
    this.checkOpening();
    history.pushState(null, "", "");
    console.log("router >>", window.location);
    console.log("url >>", location.hash);
    if (window.location.hash) {
      // window.location.replace("");
      location.hash = "";
      this.hashIndex = 0;
    }
  },
  data() {
    return {
      isMount: true,
      showDelayed: true,
      timeoutId: null,
      showGlobalNav: false,
      store: usePeopleStore(),
      worksStore: useWorksStore(),
      isLoaded: false,
      hashIndex: 0 as number, // IHash
      isScrolling: false,
      isOpen: false
    };
  },
  methods: {
    onScrollWrap(e: WheelEvent) {
      if (this.isScrolling) e.preventDefault();
      const target = e.target as HTMLElement;
      // people detail 활성화 시 detail 외부 스크롤 방지
      if (this.store.selectedPeopleId && !target.closest(".people-detail-wrap")) e.preventDefault();
    },
    changeHash(hashEnum: IHash, state: "prev" | "next" | null) {
      if (state === null || this.isScrolling || this.store.selectedPeopleId || this.worksStore.sliderState) return;
      if (this.hashIndex !== hashEnum) return;
      if (this.hashIndex === 0 && state === "prev") return;
      if (this.hashIndex === 5 && state === "next") return;
      this.isScrolling = true;
      if (state === "prev") {
        this.hashIndex = hashEnum - 1;
      } else if (state === "next") {
        this.hashIndex = hashEnum + 1;
      }
      window.location.href = `#${IHash[this.hashIndex].toLowerCase()}`;
      setTimeout(() => {
        this.isScrolling = false;
      }, 800);
    },
    setIndex(index: number) {
      this.hashIndex = index;
    },
    checkOpening() {
      const opening = new Date("2023-11-29");
      const today = new Date();
      if (today > opening) {
        this.isOpen = true;
      }
    }
  }
});
</script>

<style></style>