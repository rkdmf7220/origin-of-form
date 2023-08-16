<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";

onMounted(() => {
  const peopleStore = usePeopleStore();
  peopleStore.setPeopleList();
})
</script>