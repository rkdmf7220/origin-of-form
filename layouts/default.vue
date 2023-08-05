<template>
  <div class="wrap">
    <GlobalNav/>
    <slot/>
  </div>
</template>

<script lang="ts">
export default {
  name: "default"
}
</script>

<style>
@import "assets/styles/reset.css";
</style>