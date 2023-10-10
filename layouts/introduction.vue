<template>
  <div @wheel="(e) => onScrollContent(e)" ref="introduction" id="introduction" class="contents is-scrollable">
    <div v-if="introductionText" class="introduction-content-wrap">
      <div v-for="item in this.introductionText" class="introduction-content-item">
        <h2 class="text-title">{{ item.title }}</h2>
        <div v-for="textList in item.textList" class="text-list">
          <p v-for="text in textList" class="text-item">{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {defineComponent} from "vue";
import {IIntroduction} from "~/interfaces/TextInterface";

export default defineComponent({
  name: "introduction",
  mounted() {
    this.getIntroductionText();
  },
  data() {
    return {
      introductionText: null as null | IIntroduction
    };
  },
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["introduction"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Introduction, result);
      }
    },
    async getIntroductionText() {
      await nextTick();
      const fetchData = await useFetch("/data/introduction.json");
      this.introductionText = fetchData.data.value as IIntroduction;
    }
  }
});
</script>

<style scoped lang="scss">
.contents {
  overflow-y: scroll;

  .introduction-content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 300px 0;
    color: white;

    .introduction-content-item {
      max-width: 1180px;
      position: relative;

      &:first-child {
        margin-bottom: 180px;
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #fff;
        bottom: -100px;
      }

      &:last-child::before {
        content: none;
      }

      h2.text-title {
        margin-bottom: 40px;
      }

      .text-list {
        margin-top: 60px;

        &:first-child {
          margin-top: 0;
        }

        .text-item {
          margin-top: 20px;
          font-size: 24px;
          line-height: 1.6em;

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>