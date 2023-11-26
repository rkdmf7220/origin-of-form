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
              <div ref="indicator-coordinate-wrap" class="indicator-coordinate-wrap">
                <template v-if="indicatorMap.charts">
                  <div
                    v-for="(item, index) in indicatorMap.charts"
                    :style="[
                      {left: item.x * indicatorMapRatio + 'px'},
                      {bottom: item.y * indicatorMapRatio + 'px'},
                      {height: item.value * 6 + 'px'},
                      {backgroundColor: item.color}
                    ]"
                    :key="index"
                    class="indicator-coordinate-item"
                  ></div>
                </template>
              </div>
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
            <p v-for="item in indicatorIndex.textList">{{ item }}</p>
          </div>
          <div class="indicator-chart-outer">
            <div class="indicator-chart-sticky">
              <div class="indicator-chart-inner">
                <span class="indicator-index-axis top-axis">동시대 기술 활용도</span>
                <span class="indicator-index-axis left-axis">구성</span>
                <span class="indicator-index-axis right-axis">추상</span>
                <div
                  :style="{backgroundImage: `url(${svgIcon.get('indexIcon')})`}"
                  ref="indicator-chart-wrap"
                  class="indicator-index indicator-coordinate-wrap"
                >
                  <div
                    v-if="indicatorIndex.coordinates"
                    v-for="(item, index) in indicatorIndex.coordinates"
                    :style="[
                      {left: item.x * indicatorChartRatio + 'px'},
                      {top: item.y * indicatorChartRatio + 'px'},
                      {backgroundColor: item.color}
                    ]"
                    :key="index"
                    class="indicator-coordinate-item"
                  ></div>
                </div>
                <div class=""></div>
              </div>
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
  props: {
    isTouchDevice: Boolean
  },
  mounted() {
    this.getResearchData();
    this.computeIndicatorMapRatio();
    this.computeIndicatorChartRatio();
  },
  computed: {
    svgIcon() {
      return svgIcon;
    },
    research(): IResearch {
      return this.researchData?.find((item) => item.id === "research") as IResearch;
    },
    indicatorMap(): IIndicatorMap {
      return this.researchData?.find((item) => item.id === "indicatorMap") as IIndicatorMap;
    },
    indicatorIndex(): IIndicatorIndex {
      return this.researchData?.find((item) => item.id === "indicatorIndex") as IIndicatorIndex;
    }
    // todo: indicator의 크기 계산해서 비례대로 부여
  },
  data() {
    return {
      researchData: null as null | (IResearch | IIndicatorMap | IIndicatorIndex)[],
      indicatorMapRatio: 0 as number,
      indicatorChartRatio: 0 as number
    };
  },
  methods: {
    onScrollContent(e: WheelEvent) {
      const refs = this.$refs["research"] as HTMLDivElement;
      const result = checkScrollDone(refs, e);
      if (result !== null) {
        this.$emit("change-hash", IHash.Research, result);
      }
    },
    async getResearchData() {
      // await nextTick();
      const fetchData = await useFetch("/data/research.json");
      this.researchData = toRaw(fetchData.data.value as (IResearch | IIndicatorMap | IIndicatorIndex)[]);
    },
    computeIndicatorMapRatio() {
      this.$nextTick(() => {
        const ref = this.$refs["indicator-coordinate-wrap"] as HTMLDivElement | undefined;
        if (ref) {
          this.indicatorMapRatio = ref.offsetWidth / 280;
        } else {
          setTimeout(this.computeIndicatorMapRatio, 100);
        }
      });
    },
    computeIndicatorChartRatio() {
      this.$nextTick(() => {
        const ref = this.$refs["indicator-chart-wrap"] as HTMLDivElement | undefined;
        if (ref) {
          this.indicatorChartRatio = ref.offsetWidth / 200;
        } else {
          setTimeout(this.computeIndicatorChartRatio, 100);
        }
      });
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
        position: relative;

        .indicator-map-inner {
          position: sticky;
          top: 200px;
          display: flex;

          img {
            width: 100%;
            max-height: 415px;
          }

          .indicator-coordinate-wrap {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;

            .indicator-coordinate-item {
              width: 10px;
              position: absolute;
              background-color: #ff0000;
              opacity: 0.8;
            }
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

        .indicator-chart-sticky {
          height: 480px;
          position: sticky;
          top: 200px;

          .indicator-chart-inner {
            width: 100%;
            height: 100%;
            position: relative;

            .indicator-index-axis {
              position: absolute;
              font-size: 1.25em;

              &.top-axis {
                left: 50%;
                transform: translateX(-50%);
              }

              &.left-axis {
                left: 0;
                top: 52%;
                transform: translateY(-50%);
              }

              &.right-axis {
                right: 0;
                top: 52%;
                transform: translateY(-50%);
              }
            }

            .indicator-index {
              width: 380px;
              height: 400px;
              position: absolute;
              left: 50%;
              top: 60px;
              transform: translateX(-50%);
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center;

              .indicator-coordinate-item {
                width: 20px;
                height: 20px;
                position: absolute;
                border-radius: 10px;
                border: 2px solid rgba(255, 255, 255, 0.25);
                box-sizing: border-box;
              }
            }

            .indicator-coordinate-wrap {
              /*width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;*/
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .research-content-wrap {
    padding: 150px 10px;

    .research-content-item {
      .text-list {
        font-size: 1.25em;
      }

      .caption-list {
        font-size: 1em;
      }

      .indicator-wrap {
        flex-direction: column;

        .indicator-map-outer {
          width: 100%;
        }

        .text-list {
          width: 100%;
        }

        .indicator-chart-outer {
          width: 100%;

          .indicator-chart-sticky {
            height: 100vw;

            .indicator-chart-inner .indicator-index {
              width: calc(100% - 80px);
              height: 0;
              padding-bottom: calc((100% - 80px) * 1.052);
            }
          }
        }
      }
    }
  }
}
</style>