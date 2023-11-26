<template>
  <div :class="{'is-show': showDelayed}" class="people-detail-wrap">
    <div v-if="peopleData" class="people-detail-inner">
      <button
        @click="onClickCloseBtn"
        :style="{backgroundImage: 'url(' + svgIcon.get(`closeIcon`) + ')'}"
        class="btn-close is-clickable"
      ></button>
      <h2 class="people-name">{{ peopleData.name }}</h2>
      <ul class="people-info-list">
        <li v-for="info in peopleData.info" :key="info.id" class="people-info-item">
          <span class="text-bold">{{ info.title }} : </span>{{ info.text }}
        </li>
      </ul>
      <div class="people-text-list">
        <p v-for="textItem in peopleData.textList" class="people-text-item">{{ textItem }}</p>
      </div>
      <div class="people-indicator-wrap">
        <h4 class="people-indicator-title">분석지표</h4>
        <ul class="indicator-text-list">
          <li
            v-for="indicatorText in peopleData.indicators.filter((item) => item.id === indicatorId.Text)"
            class="indicator-text-item"
          >
            <p class="title text-bold">{{ indicatorText.title }}</p>
            <p>{{ indicatorText.text }}</p>
          </li>
        </ul>
        <ul class="indicator-chart-list">
          <li class="indicator-chart-item">
            <p class="title text-bold">{{ peopleIndicatorMap.title }}</p>
            <div class="indicator-map">
              <span
                v-for="(item, index) in peopleIndicatorMap.coordinates"
                :style="[{left: item.x + 'px'}, {top: item.y + 'px'}]"
                :key="index"
                class="indicator-coordinate"
              ></span>
            </div>
          </li>
          <li class="indicator-chart-item">
            <p class="title text-bold">{{ peopleIndicatorIndex.title }}</p>
            <div class="indicator-index-wrap">
              <span class="indicator-index-axis top-axis">동시대 기술 활용도</span>
              <span class="indicator-index-axis left-axis">구성</span>
              <span class="indicator-index-axis right-axis">추상</span>
              <div :style="{backgroundImage: 'url(' + svgIcon.get('indexIcon') + ')'}" class="indicator-index">
                <span
                  :style="[{left: peopleIndicatorIndex.x + 'px'}, {top: peopleIndicatorIndex.y + 'px'}]"
                  class="indicator-coordinate"
                ></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";
import svgIcon from "public/images/svgIcon";
import {ID, IIndicator, IPeople} from "~/interfaces/PeopleInterface";
import {defineComponent} from "vue";

export default defineComponent({
  name: "PeopleDetail",
  computed: {
    svgIcon() {
      return svgIcon;
    },
    peopleData: function (): IPeople {
      return toRaw(this.peopleStore.getPeopleInformation(this.peopleStore.selectedPeopleId));
    },
    peopleIndicatorMap: function (): IIndicator {
      return this.peopleData.indicators!.find((item: IIndicator) => item.id === ID.Map)!;
    },
    peopleIndicatorIndex: function (): IIndicator {
      return this.peopleData.indicators!.find((item: IIndicator) => item.id === ID.Indicator)!;
    }
  },
  watch: {
    peopleData(newVal) {
      this.showDelayed = !!newVal;
    }
  },
  data() {
    return {
      indicatorId: ID,
      peopleStore: usePeopleStore(),
      showDelayed: false
    };
  },
  methods: {
    onClickCloseBtn() {
      this.peopleStore.setSelectedPeopleId("");
    }
  }
});
</script>

<style scoped lang="scss">
.people-detail-wrap {
  width: 50vw;
  height: 100vh;
  position: absolute;
  z-index: 60;
  top: 0;
  right: -50vw;
  bottom: 0;
  padding: 100px 0 100px 100px;
  box-sizing: border-box;
  background-color: rgba(33, 33, 33, 0.8);
  backdrop-filter: blur(20px);
  color: #fff;
  overflow: auto;
  line-height: 1.5em;
  transition: right 0.3s;
  overscroll-behavior: none;

  &.is-show {
    right: 0;
  }

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

  .people-detail-inner {
    max-width: 600px;
    position: relative;

    .btn-close {
      width: 50px;
      height: 50px;
      padding: 10px;
      box-sizing: content-box;
      border: none;
      background-color: transparent;
      background-position: center;
      background-repeat: no-repeat;
      position: sticky;
      float: right;
      top: 0;
      margin-right: -60px;
      cursor: none;
    }

    .people-name {
      margin-bottom: 40px;
    }

    .people-info-list {
      margin-bottom: 20px;

      .people-info-item {
        line-height: 2em;
      }
    }

    .people-text-list {
      margin-bottom: 60px;

      .people-text-item {
        word-break: keep-all;
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .people-indicator-wrap {
      .people-indicator-title {
        margin-bottom: 20px;
      }
    }

    .indicator-text-list {
      width: 100%;
      max-height: 700px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      column-gap: 40px;
      row-gap: 35px;
      margin-bottom: 30px;

      .indicator-text-item {
        width: calc(50% - 20px);
        word-break: keep-all;
        min-height: 240px;
      }
    }

    .indicator-chart-list {
      display: flex;
      column-gap: 40px;

      .indicator-chart-item {
        .indicator-map {
          width: 280px;
          height: 200px;
          background-image: url("public/images/map.png");
          background-size: contain;
          position: relative;
        }

        .indicator-index-wrap {
          width: 280px;
          height: 240px;
          position: relative;

          .indicator-index-axis {
            position: absolute;
            font-size: 0.85em;

            &.top-axis {
              left: 50%;
              transform: translateX(-50%);
            }

            &.left-axis {
              left: 0;
              top: 53%;
              transform: translateY(-50%);
            }

            &.right-axis {
              right: 0;
              top: 53%;
              transform: translateY(-50%);
            }
          }

          .indicator-index {
            width: 194px;
            height: 200px;
            top: 30px;
            left: 40px;
            position: absolute;
          }
        }

        .indicator-coordinate {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #ff0000;
          position: absolute;
        }
      }
    }
  }
}

.title {
  margin-bottom: 15px;
}
</style>