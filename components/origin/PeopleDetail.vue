<template>
  <div class="people-detail-wrap">
    <div v-if="getPeopleInfo" class="people-detail-inner">
      <NuxtLink to="/origin">
        <button :style="{backgroundImage: 'url(' + svgIcon.get(`closeIcon`) + ')'}" class="btn-close"></button>
      </NuxtLink>
      <h2>{{ getPeopleInfo.name }}</h2>
      <ul class="people-info-list">
        <li v-for="info in getPeopleInfo.info" :key="info.id" class="people-info-item">
          <span class="text-bold">{{ info.title }} : </span>{{ info.text }}
        </li>
      </ul>
      <div class="people-text-list">
        <p v-for="textItem in getPeopleInfo.textList" class="people-text-item">{{ textItem }}</p>
      </div>
      <div class="people-indicator-wrap">
        <h4 class="people-indicator-title">분석지표</h4>
        <ul class="indicator-text-list">
          <li v-for="indicatorText in getPeopleInfo.indicators.filter((item) => (item.id === indicatorID.Text))"
              class="indicator-text-item">
            <p class="title text-bold">{{ indicatorText.title }}</p>
            <p>{{ indicatorText.text }}</p>
          </li>
        </ul>
        <ul class="indicator-chart-list">
          <li class="indicator-chart-item">
            <p class="title text-bold">{{ peopleIndicatorMap.title }}</p>
            <div class="indicator-map">
              <span v-for="(item, index) in peopleIndicatorMap.coordinates"
                    :style="[{left: item.x + 'px'}, {top: item.y + 'px'}]" :key="index"
                    class="indicator-coordinate"></span>
            </div>
          </li>
          <li class="indicator-chart-item">
            <p class="title text-bold">{{ peopleIndicatorIndex.title }}</p>
            <div :style="{backgroundImage: 'url(' + svgIcon.get('indexIcon') + ')'}" class="indicator-index">
              <span :style="[{left: peopleIndicatorIndex.x + 'px'}, {top: peopleIndicatorIndex.y + 'px'}]"
                    class="indicator-coordinate"></span>
              <span class="indicator-index-axis top-axis">동시대 기술 활용도</span>
              <span class="indicator-index-axis left-axis">구성</span>
              <span class="indicator-index-axis right-axis">추상</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";
import {computed} from "@vue/runtime-core";
import svgIcon from "public/imgs/svgIcon";
import {ID} from "~/interfaces/PeopleInterface";

export default {
  name: "PeopleDetail",
  setup() {
    const instance = getCurrentInstance();
    const peopleStore = usePeopleStore();
    const indicatorID = ID;
    const getPeopleInfo = computed(() => {
      const peopleId = instance?.proxy?.$route?.params.id;
      const result = peopleStore.getPeopleInformation(peopleId as string);
      return result ? result : "null";
      // todo: handling null error
    });
    const peopleIndicatorMap = computed(() => {
      return getPeopleInfo.value.indicators.find((item) => item.id === indicatorID.Map);
    });
    const peopleIndicatorIndex = computed(() => {
      return getPeopleInfo.value.indicators.find((item) => item.id === indicatorID.Indicator);
    });

    return {
      getPeopleInfo,
      ...{svgIcon},
      indicatorID,
      peopleIndicatorMap,
      peopleIndicatorIndex
    };
  }
};
</script>

<style scoped lang="scss">
.people-detail-wrap {
  width: 50vw;
  height: 100vh;
  position: fixed;
  z-index: 60;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 100px 0 100px 100px;
  box-sizing: border-box;
  background-color: rgba(33, 33, 33, 0.8);
  backdrop-filter: blur(20px);
  color: #fff;
  overflow: auto;
  line-height: 1.5em;

  &::-webkit-scrollbar {
    width: 5px;
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
      width: 40px;
      height: 40px;
      border: none;
      background-color: transparent;
      position: absolute;
      right: 0;
      cursor: pointer;
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
      max-height: 900px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      column-gap: 40px;
      row-gap: 35px;
      margin-bottom: 30px;

      .indicator-text-item {
        width: calc(50% - 20px);
      }
    }

    .indicator-chart-list {
      display: flex;
      column-gap: 40px;

      .indicator-chart-item {
        .indicator-map {
          width: 280px;
          height: 200px;
          background-image: url("public/imgs/map.png");
          position: relative;
        }

        .indicator-index {
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
              top: 57%;
              transform: translateY(-50%);
            }

            &.right-axis {
              right: 0;
              top: 57%;
              transform: translateY(-50%);
            }
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