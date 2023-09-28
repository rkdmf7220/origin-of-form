<template>
  <div @wheel="(e) => onScrollWrap(e)" class="wrap">
    <Main @change-hash="changeHash" />
    <!--    <Main @scroll.prevent="onHandleScroll" :show-delayed="showDelayed" />-->
    <div>
      <GlobalNav @change-index="setIndex" />
      <Origin @change-hash="changeHash" />
      <Works @change-hash="changeHash" />
      <Introduction @change-hash="changeHash" />
      <Research @change-hash="changeHash" />
    </div>

    <ClippingMask ref="clipping-mask" />
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Main from "~/layouts/main.vue";
import Origin from "~/layouts/origin.vue";
import Works from "~/layouts/works.vue";
import Introduction from "~/layouts/introduction.vue";
import Research from "~/layouts/research.vue";
import {usePeopleStore} from "~/stores/PeopleStore";
import {IHash} from "~/interfaces/IHash";

interface IClippingData {
  xPosition: number;
  yPosition: number;
  size: string;
}

export default defineComponent({
  name: "default",
  components: {Research, Introduction, Works, Origin, Main},
  mounted() {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    // window.addEventListener("wheel", (e) => preventScroll(e), {passive: false});
    window.addEventListener("mousemove", (e) => this.getCursorPosition(e));
    window.addEventListener("wheel", (e) => this.getCursorPosition(e));
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
    getCursorPosition(e: MouseEvent): void {
      // todo: smooth behavior
      const clippingMask = this.$refs["clipping-mask"] as IClippingData;
      clippingMask.xPosition = e.pageX;
      clippingMask.yPosition = e.pageY;
    },
    onScrollWrap(e: WheelEvent) {
      if (this.isScrolling) e.preventDefault();
    },
    changeHash(hashEnum: IHash, state: "prev" | "next" | null) {
      if (state === null || this.isScrolling) return;
      if (hashEnum === 0 && state === "prev") return;
      if (hashEnum === 5 && state === "next") return;
      console.log("before >>", hashEnum, state, this.hashIndex, Date.now());
      this.isScrolling = true;
      if (state === "prev") {
        this.hashIndex = this.hashIndex - 1;
      } else if (state === "next") {
        this.hashIndex = this.hashIndex + 1;
      }
      window.location.href = `#${IHash[this.hashIndex].toLowerCase()}`;
      console.log("after >>", hashEnum, state, this.hashIndex, Date.now());
      setTimeout(() => {
        this.isScrolling = false;
      }, 300);
    },
    setIndex(index: number) {
      this.hashIndex = index;
    }
  }
});
</script>

<style>
.wrap {
  position: relative;
}
</style>