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
</script>

<style>
.container {
  margin: 2vh auto 0 auto;
  max-width: 95%;
}
</style>
