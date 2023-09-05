<template>
  <div>
    <slot>
      <Loading :is-loaded="isLoaded" :show-delayed="showDelayed" />
    </slot>
    <slot v-if="usePeopleStore().isLoaded">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </slot>
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
});
watch(() => usePeopleStore().isLoaded, (newValue, oldValue) => {
  if (newValue === true) {
    setTimeout(() => {
      showDelayed.value = true;
    }, 1500);
    setTimeout(() => {
      isLoaded.value = true;
    }, 2000);
  }
});
</script>

<style>
@import "assets/styles/reset.css";
</style>