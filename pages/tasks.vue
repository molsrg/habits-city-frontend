<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
});

useHead({
  title: 'HS | Calendar',
});
</script>

<template>
  <div class="flex w-full flex-col gap-6 p-4">
    <!-- Daily Tasks -->
    <div class="flex w-full flex-col gap-2">
      <h3 class="text-xl font-semibold">Daily Tasks</h3>
      <UCard>
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </div>

    <!-- Weekly Tasks -->
    <div class="flex w-full flex-col gap-2">
      <h3 class="text-xl font-semibold">Weekly Tasks</h3>
      <UCard>
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </div>

    <!-- Backlog -->
    <div class="flex w-full flex-col gap-2">
      <h3 class="text-xl font-semibold">Backlog</h3>
      <UCard>
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </div>
  </div>
</template>

