<template>
  <div class="people-detail-wrap">
    <div v-if="getPeopleInfo" class="people-detail-inner">
      <h2>{{ getPeopleInfo.name }}</h2>
      <ul class="people-info-list">
        <li v-for="item in getPeopleInfo.info" :key="item.id" class="people-info-item">
          <span>{{ item.title }}</span>{{ item.text }}
        </li>
      </ul>
      <p>{{ getPeopleInfo }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";
import {computed} from "@vue/runtime-core";

export default {
  name: "PeopleDetail",
  setup() {
    const instance = getCurrentInstance();
    const peopleStore = usePeopleStore();
    const getPeopleInfo = computed(() => {
      const peopleId = instance?.proxy?.$route?.params.id;
      const result = peopleStore.getPeopleInformation(peopleId as string);
      return result ? result : 'null'
      // todo: handling null error
    })
    return {
      getPeopleInfo
    }
  }
}
</script>

<style scoped lang="scss">
.people-detail-wrap {
  width: 50vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 100px 0 100px 100px;
  box-sizing: border-box;
  background-color: #202020;
  backdrop-filter: blur(20px);
  color: #fff;
  overflow: auto;

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
  }
}
</style>