<template>
  <div>
    <NuxtLayout>
      <NuxtPage class="container" />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
useSeoMeta({
  title: 'Habits City',
  ogTitle: 'Habits City',
  description: 'Website for building habits',
  ogDescription: 'Website for building habits',
})
</script>

<style>
.container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  margin-top: 2vh;
}
</style>
