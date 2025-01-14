<template>
  <div>
    <NuxtLayout>
      <div v-if="isLoadingPage" class="pending">
        <h3 class="text-xl">{{ $t('page--pending.wait-loading') }}</h3>
        <LoaderApp />
      </div>
      <NuxtPage v-else class="container" />
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
      <UButton
        color="blue"
        label="Button"
        size="sm"
        style="display: none"
        variant="soft" />
      <UButton
        color="indigo"
        label="Button"
        size="sm"
        style="display: none"
        variant="soft" />
      <UButton
        color="emerald"
        label="Button"
        size="sm"
        style="display: none"
        variant="soft" />
      <UButton
        color="cyan"
        label="Button"
        size="sm"
        style="display: none"
        variant="soft" />
    </div>

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

// onMounted(() => {
//   if (process.client) {
//     const htmlElement = document.documentElement;
//     htmlElement.classList.add('dark');
//     htmlElement.classList.remove('light');
//   }
// });
</script>

<style scoped>
.container {
  margin: 2vh auto 0 auto;
  max-width: 95%;
}

.pending {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
  padding: 20px;
}
</style>
