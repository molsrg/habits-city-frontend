<template>
  <div>STORE</div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Store',
  middleware: ['auth'],
  colorMode: 'dark'
});

useHead({
  title: 'HS | Store',
});
</script>
