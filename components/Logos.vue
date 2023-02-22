<template>
  <kbd class="tw-daisy-kbd">ctrl</kbd>
  <div class="display-logo tw-flex tw-gap-2 tw-items-center">
    <img
      class="logo"
      alt="logo"
      src="https://element-plus.org/images/element-plus-logo.svg"
    />
    <el-icon><ElIconPlus /></el-icon>
    <NuxtLogo class="logo" />
  </div>
  <h2>
    <a target="_blank" rel="noopener" href="https://element-plus.org/"
      >Element Plus
    </a>
    <span>W1ith</span>
    <a target="_blank" rel="noopener" href="https://v3.nuxtjs.org/">NuxtJS</a>
  </h2>
</template>
<script lang="ts" setup>
import { TEST } from "~/utils/events";

const { count } = useCount();
const { $on } = useNuxtApp();

$on(TEST, function () {
  count.value++;
});
</script>
<style>
.display-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 3rem;
}
</style>
