<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {usePeopleStore} from "~/stores/PeopleStore";

const peopleStore = usePeopleStore();
peopleStore.setPeopleList();
</script>