<template>
  <div @wheel="(e) => onScrollContent(e)" ref="research" id="research" class="contents is-scrollable">
    <div v-if="researchData" class="research-content-wrap">
      <div class="research-content-item">
        <h2 class="text-title">{{ research.title }}</h2>
        <div class="text-list">
          <p v-for="item in research.textList">{{ item }}</p>
        </div>
        <div class="caption-list">
          <p v-for="item in research.captionList">{{ item }}</p>
        </div>
      </div>
      <div class="research-content-item">
        <h2 class="text-title">{{ indicatorMap.title }}</h2>
        <div class="indicator-wrap">
          <div class="indicator-map-outer">
            <div class="indicator-map-inner">
              <img src="/images/map.png" alt="세계 지도" />
            </div>
          </div>
          <div class="text-list">
            <p v-for="item in indicatorMap.textList">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="research-content-item">
        <h2 class="text-title">{{ research.title }}</h2>
        <div class="indicator-wrap">
          <div class="text-list">
            <p v-for="item in indicatorMap.textList">{{ item }}</p>
          </div>
          <div class="indicator-chart-outer">
            <div class="indicator-chart-inner">
              <div :style="{backgroundImage: `url(${svgIcon.get('indexIcon')})`}" class="indicator-index"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {checkScrollDone} from "~/utils/scroll";
import {IHash} from "~/interfaces/IHash";
import {defineComponent} from "vue";
import {IIndicatorIndex, IIndicatorMap, IResearch} from "~/interfaces/ResearchInterface";
import svgIcon from "public/images/svgIcon";

export default defineComponent({
  name: "research",
  mounted() {
    this.getResearchData();
  },
  computed: {
    svgIcon() {
      return svgIcon;
    },
    research(): IResearch {
      console.log("myData >>", this.researchData?.find((item) => item.id === "research"));
      return this.researchData?.find((item) => item.id === "research") as IResearch;
    },
    indicatorMap(): IIndicatorMap {
      return this.researchData?.find((item) => item.id === "indicatorMap") as IIndicatorMap;
    },
    indicatorIndex(): IIndicatorIndex {
      return this.researchData?.find((item) => item.id === "indicatorIndex") as IIndicatorIndex;
    }
  },
  data() {
    return {
      researchData: null as null | (IResearch | IIndicatorMap | IIndicatorIndex)[]
    };
  },
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["research"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result === "prev") {
        this.$emit("change-hash", IHash.Research, result);
      }
    },
    async getResearchData() {
      // await nextTick();
      const fetchData = await useFetch("/data/research.json");
      this.researchData = toRaw(fetchData.data.value as (IResearch | IIndicatorMap | IIndicatorIndex)[]);
      console.log("data >>", fetchData, fetchData.data, this.researchData);
    }
  }
});
</script>

<style scoped lang="scss">
.research-content-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 300px 0;
  color: white;

  .research-content-item {
    max-width: 1180px;
    position: relative;
    margin-bottom: 180px;

    &:last-child {
      margin-bottom: 0;
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

    .text-title {
      margin-bottom: 40px;
    }

    .text-list {
      font-size: 24px;
      word-break: keep-all;

      p {
        margin-bottom: 20px;
      }
    }

    .caption-list {
      font-size: 20px;
      color: #ddd;
    }

    .indicator-wrap {
      display: flex;
      gap: 20px;
      flex: 1 1 0;
      position: relative;

      .indicator-map-outer {
        width: 50%;

        .indicator-map-inner {
          position: sticky;
          top: 200px;

          img {
            width: 100%;
          }
        }
      }

      .text-list {
        width: 50%;
        margin-bottom: 40px;
        word-break: keep-all;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .indicator-chart-outer {
        width: 50%;
        position: relative;

        .indicator-chart-inner {
          height: 520px;
          position: sticky;
          top: 100px;

          .indicator-index {
            //width: 380px;
            //height: 400px;
            width: 100%;
            height: 100%;
            background-size: 73%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
  }
}
</style>