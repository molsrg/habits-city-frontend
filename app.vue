<template>
  <div>
    <NuxtLayout>
      <NuxtPage class="container" />
    </NuxtLayout>
    <UNotifications />

    <UButton
      class="fixed bottom-3 right-3 flex items-center justify-center rounded-full"
      color="green"
      icon="i-heroicons-hand-raised"
      size="md"
      variant="solid"
      @click="openTicketsModal"
    />

    <div style="display: none">
      <UButton color="blue" label="Button" size="sm" style="display: none" variant="soft" />

      <UButton color="indigo" label="Button" size="sm" style="display: none" variant="soft" />
      <UButton color="emerald" label="Button" size="sm" style="display: none" variant="soft" />
      <UButton color="cyan" label="Button" size="sm" style="display: none" variant="soft" />
    </div>

    <TicketsModal />
  </div>
</template>

<script lang="ts" setup>
import TicketsModal from '@/components/modal/TicketsModal.vue';
import { ModalName } from '@/constants/modalName';

import { modalService } from '@/services/modal.service';

useSeoMeta({
  title: 'Habits City',
  ogTitle: 'Habits City',
  description: 'Website for building habits',
  ogDescription: 'Website for building habits',
});
const openTicketsModal = () => {
  modalService.open(ModalName.Tickets);
};


// onMounted(() => {
//   if (process.client) {
//     const htmlElement = document.documentElement;
//     htmlElement.classList.add('dark');
//     htmlElement.classList.remove('light');
//   }
// });
</script>

<style>
.container {
  margin: 2vh auto 0 auto;
  max-width: 95%;
}
</style>
