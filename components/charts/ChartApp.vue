<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-base font-semibold">{{ title }}</h3>
    <slot />
  </div>
</template>
<style></style>
