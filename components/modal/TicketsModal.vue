<script lang="ts" setup>
import { ModalName } from '@/constants/modalName';
import { optionsSupport } from '@/constants/support';
import { modalService } from '@/services/modal.service';
import { useAppStore } from '@/store/app.store';

const options = optionsSupport();
const appStore = useAppStore();
const isOpenModal = computed(() => modalService.isOpen(ModalName.Tickets));
const { t } = useI18n();

const selectedTopic = ref(null);
const topicContent = ref('');
const isAddUsername = ref(false);
const selectedUsername = ref('');
let systemInfo = {};

const disabledButton = computed(() => {
  return !selectedTopic.value || !topicContent.value.trim() || (isAddUsername.value && !selectedUsername.value.trim());
});

if (import.meta.client) {
  systemInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language || navigator.userLanguage,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    localeTime: new Date().toLocaleString(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isOnline: navigator.onLine,
    connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
    cpuCores: navigator.hardwareConcurrency,
    cookiesEnabled: navigator.cookieEnabled,
    currentPage: window.location.pathname,
  };
}

const submit = () => {
  const supportTicketData = {
    topic: selectedTopic.value.value,
    content: topicContent.value,
    ...(isAddUsername.value && { username: selectedUsername.value }),
    systemInfo,
  };

  appStore.sendSupportTicket(supportTicketData);

  modalService.close(ModalName.Tickets);
  selectedTopic.value = null;
  topicContent.value = '';
  selectedUsername.value = '';
  isAddUsername.value = false;
};
</script>
<template>
  <UModal v-model="isOpenModal">
    <UCard>
      <template #header>
        <div class="flex flex-col">
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{ t('support.title') }}</h3>
              <p class="text-sm text-gray-500">{{ t('support.description') }}</p>
            </div>
            <UButton color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost" @click="modalService.close(ModalName.Tickets)" />
          </div>
        </div>
      </template>

      <div class="mb-3 flex flex-col gap-1">
        <p class="text-sm font-semibold dark:text-white">{{ t('support.topic.label') }}</p>
        <USelectMenu v-model="selectedTopic" :options="options" :placeholder="t('support.topic.placeholder')" option-attribute="name">
          <template #label>
            <div v-if="selectedTopic" class="flex items-center">
              <span :style="{ backgroundColor: selectedTopic.color }" aria-hidden="true" class="inline-block h-2 w-2 rounded-full" />
              <span :style="{ color: selectedTopic.color }" class="ml-2 truncate">{{ selectedTopic.name }}</span>
            </div>
            <span v-else class="text-gray-400">{{ t('support.topic.placeholder') }}</span>
          </template>

          <template #option="{ option: item }">
            <div class="flex items-center">
              <span :style="{ backgroundColor: item.color }" aria-hidden="true" class="inline-block h-2 w-2 rounded-full" />
              <span :style="{ color: item.color }" class="ml-2 truncate">{{ item.name }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>

      <UTextarea v-model="topicContent" :placeholder="t('support.textarea.placeholder')" autoresize class="mb-3" />

      <div class="flex flex-col items-start gap-2">
        <p class="text-justify text-sm text-gray-500">
          {{ t('support.balance.title') }}
        </p>
        <div class="flex items-center gap-2">
          <UToggle v-model="isAddUsername" />
          <span class="text-sm text-gray-600"> {{ t('support.balance.toggle') }}</span>
        </div>
        <ProfileInputItem v-show="isAddUsername" v-model="selectedUsername" :placeholder="t('support.balance.placeholder')" />
      </div>

      <template #footer>
        <div class="flex items-start justify-end">
          <UButton
            :disabled="disabledButton"
            :label="t('support.button.submit')"
            color="green"
            size="xs"
            variant="soft"
            @click="submit" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
