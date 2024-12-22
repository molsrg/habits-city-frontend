<script lang="ts" setup>
definePageMeta({
  middleware() {
    useRouter().replace('/');
  },
  colorMode: 'dark'
});
</script>

<template>
  <slot />
</template>
