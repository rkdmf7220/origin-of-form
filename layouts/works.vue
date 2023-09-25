<template>
  <div ref="works" @wheel="(e) => onScrollContent(e)" id="works" class="contents">
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
.contents {
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 3px;
    background-color: transparent;
  }
}

.box-wrap {
  height: 100vh;
  //overflow-y: scroll;
}

.box {
  height: 200vh;
  background-color: #666666;
}
</style>