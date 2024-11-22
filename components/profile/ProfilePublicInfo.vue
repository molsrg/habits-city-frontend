<script lang="ts" setup>
import GitHubActivity from '@/components/charts/GitHubActivity.vue';

defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <UAvatar :alt="userInfo.username || ''" :src="userInfo.avatar || ''" size="3xl" />
  </div>

  <GitHubActivity />
</template>

<style scoped></style>
