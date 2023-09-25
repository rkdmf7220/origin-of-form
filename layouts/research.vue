<template>
  <div @wheel="(e) => onScrollContent(e)" ref="research" id="research" class="contents">is research layout.</div>
</template>

<script lang="ts">
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {defineComponent} from "vue";

export default defineComponent({
  name: "research",
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["research"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result === "prev") {
        this.$emit("change-hash", IHash.Research, result);
      }
    }
  }
});
</script>

<style scoped lang="scss"></style>