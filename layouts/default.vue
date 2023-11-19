<template>
  <div @wheel="(e) => onScrollWrap(e)" class="wrap">
    <Main @change-hash="changeHash" />
    <!--    <Main :show-delayed="showDelayed" />-->
    <div>
      <GlobalNav @change-index="setIndex" :hash-index="hashIndex" />
      <Introduction @change-hash="changeHash" />
      <Origin @change-hash="changeHash" />
      <Works @change-hash="changeHash" />
      <Research @change-hash="changeHash" />
    </div>

    <ClippingMask ref="clipping-mask" />
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Main from "~/layouts/main.vue";
import Introduction from "~/layouts/introduction.vue";
import Origin from "~/layouts/origin.vue";
import Works from "~/layouts/works.vue";
import Research from "~/layouts/research.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "default",
  components: {Research, Introduction, Works, Origin, Main},
  mounted() {
    const hashData = window.location.hash;
    const hashEnum = hashData.replace("#", "").charAt(0).toUpperCase() + hashData.replace("#", "").slice(1);
    this.hashIndex = hashEnum ? IHash[hashEnum as keyof typeof IHash] : IHash.Main;
  },
  data() {
    return {
      isMount: true,
      showDelayed: true,
      timeoutId: null,
      showGlobalNav: false,
      store: usePeopleStore(),
      isLoaded: false,
      hashIndex: 0 as number, // IHash
      isScrolling: false
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
      if (state === null || this.isScrolling || this.store.selectedPeopleId) return;
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
    }
  }
});
</script>

<style></style>