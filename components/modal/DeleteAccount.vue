<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useUserStore } from '@/store/user.store';

const { t } = useI18n();
const userStore = useUserStore();

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const deleteUsernameInput = ref('');
const isOpenModal = computed(() => {
  return modalService.isOpen(ModalName.DeleteAccount);
});

const handleDeleteAccount = async () => {
  await userStore.deleteAccount();
  modalService.close(ModalName.DeleteAccount);
};
</script>

<template>
  <UModal v-model="isOpenModal" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-start justify-between">
          <div class="flex flex-col items-start justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ t('modal.delete-account.title') }}
            </h3>
            <p class="mb-4 text-sm text-gray-500">
              {{ t('modal.delete-account.description') }}
            </p>
          </div>

          <UButton
            class="-my-1"
            color="gray"
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            @click="modalService.close(ModalName.DeleteAccount)"
          />
        </div>
      </template>

      <div class="flex flex-col items-center justify-center gap-2">
        <UInput v-model="deleteUsernameInput" :placeholder="t('modal.delete-account.placeholder')" class="pb-4" type="text" />
        <UButton
          :disabled="deleteUsernameInput !== props.username"
          :label="t('modal.delete-account.delete-button')"
          color="red"
          variant="solid"
          @click="handleDeleteAccount"
        />
      </div>
    </UCard>
  </UModal>
</template>
