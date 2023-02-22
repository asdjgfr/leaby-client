<template>
  <div class="page-index">
    <Logos />
    <Examples />
    <div>654</div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

console.log(config.public.PROJECT_ENV);
</script>

<style>
.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
