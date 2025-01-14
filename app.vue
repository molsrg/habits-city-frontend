<template>
  <div>
    <NuxtLayout>
      <div v-if="isLoadingPage" class="flex flex-col items-center gap-10 p-5">
        <h3 class="text-xl">{{ $t('page--pending.wait-loading') }}</h3>
        <LoaderApp />
      </div>
      <NuxtPage v-else class="mx-auto max-w-[95%]" />
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
import LoaderApp from '@/components/loader/LoaderApp.vue';
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

const isLoadingPage = useState('isLoadingPage');
</script>
