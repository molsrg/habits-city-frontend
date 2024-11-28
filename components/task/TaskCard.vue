<script lang="ts" setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <UCard
    :ui="{
      body: {
        base: 'text-sm text-justify font-medium',
        padding: 'px-2 py-2 sm:p-2',
      },
      header: {
        padding: 'px-2 py-2 sm:p-2',
      },
    }"
  >
    <template #header>
      <div class="flex items-start justify-between">
        <div class="flex items-center justify-between gap-1">
          <UAvatar alt="molsrg" size="sm" src="https://hb.ru-msk.vkcloud-storage.ru/users-photo/avatars/21aa6238-e398-482d-ab01-0255ee74f08d" />
          <UBadge color="primary" variant="soft"> @ {{ content.user }}</UBadge>
        </div>

        <UButton
          v-if="content.completed"
          color="gray"
          disabled
          icon="i-heroicons-check-circle"
          variant="ghost" />
        <UButton
          v-else
          color="gray"
          icon="i-heroicons-check"
          variant="ghost"
          @click="$emit('update:status', props.content.id)" />
      </div>
    </template>
    <h2 :class="[{ 'line-through': content.completed }]">
      {{ content.name }}
    </h2>
  </UCard>
</template>
