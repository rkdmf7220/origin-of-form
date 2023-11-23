<template>
  <div ref="main" @wheel="(e) => onScrollContent(e)" id="main" class="main-container">
    <MarqueeContent />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MarqueeContent from "~/components/MarqueeContent.vue";
import ClippingMask from "~/components/ClippingMask.vue";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "main",
  components: {MarqueeContent, ClippingMask},
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["main"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result === "next") {
        this.$emit("change-hash", IHash.Main, result);
      }
    }
  }
});
</script>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: calc(100vh - 100px);
  transition: height 0.3s;
  overflow: hidden;
  position: relative;
  background: linear-gradient(180deg, #1e1e1e 0%, #000 100%), url(/images/noise.svg);

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(180deg, rgba(30, 30, 30, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(/images/noise.svg);
    mix-blend-mode: lighten;
    opacity: 0.7;
  }
}
</style>