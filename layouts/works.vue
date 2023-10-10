<template>
  <div ref="works" @wheel="(e) => onScrollContent(e)" id="works" class="contents is-scrollable">
    <p>is works layout.</p>
    <div class="box-wrap">
      <div class="box"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";

export default defineComponent({
  name: "works",
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["works"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Works, result);
      }
    }
  }
});
</script>

<style scoped lang="scss">
.box-wrap {
  height: 100vh;
  //overflow-y: scroll;
}

.box {
  height: 200vh;
  background-color: #666666;
}
</style>