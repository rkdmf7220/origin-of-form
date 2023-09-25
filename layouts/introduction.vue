<template>
  <div @wheel="(e) => onScrollContent(e)" ref="introduction" id="introduction" class="contents">
    is introduction layout.
  </div>
</template>

<script lang="ts">
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {defineComponent} from "vue";

export default defineComponent({
  name: "introduction",
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["introduction"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Introduction, result);
      }
    }
  }
});
</script>

<style scoped lang="scss"></style>