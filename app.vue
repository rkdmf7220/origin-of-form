<template>
  <div>
    <!--    <slot>
          <Loading :is-loaded="isLoaded" :show-delayed="showDelayed" />
        </slot>
        <slot v-if="usePeopleStore().isLoaded">
          <NuxtLayout />
        </slot>-->
    <NuxtLayout />
  </div>
</template>
<script setup lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";
import Loading from "~/layouts/loading.vue";

const isLoaded = ref(false);
const showDelayed = ref(false);

onMounted(() => {
  const peopleStore = usePeopleStore();
  peopleStore.setPeopleList();
  peopleStore.setMarqueeTextList();
});
watch(
  () => usePeopleStore().isLoaded,
  (newValue, oldValue) => {
    if (newValue === true) {
      setTimeout(() => {
        showDelayed.value = true;
      }, 1500);
      setTimeout(() => {
        isLoaded.value = true;
      }, 2000);
    }
  }
);
useHead({
  htmlAttrs: {
    lang: "ko"
  },
  title: "형태의 뿌리",
  meta: [{"http-equiv": "Content-Security-Policy", content: "connect-src 'self' vitals.vercel-insights.com"}]
});
useSeoMeta({
  title: "형태의 뿌리",
  ogTitle: "형태의 뿌리",
  ogDescription: "과거 및 동시대 문자 예술에 대한 연구 및 실험",
  ogUrl: "//originofform.com"
});
</script>

<style lang="scss">
@import "assets/styles/reset.css";
@import "assets/styles/default";
</style>