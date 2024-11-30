<script lang="ts" setup>
import ChartApp from '@/components/charts/ChartApp.vue';
import ChartProfile from '@/components/charts/ChartProfile.vue';
import { FRIENDS_STATUS } from '@/constants/friends';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';

const isOpenModal = computed(() => modalService.isOpen(ModalName.Profile));
const modalPayload = computed(() => modalService.getPayload(ModalName.Profile));
const { t } = useI18n();

defineEmits('delete:friend');
</script>

<template>
  <UModal v-model="isOpenModal">
    <UCard>
      <template #header>
        <div class="flex items-start justify-between">
          <div class="flex items-start justify-between gap-3">
            <UAvatar :alt="modalPayload.avatar || ''" :src="modalPayload.avatar || ''" size="xl" />
            <div class="flex flex-col items-start justify-between gap-1">
              <UBadge color="primary" variant="soft"> @ {{ modalPayload.username }}</UBadge>
              <UBadge v-if="modalPayload.bio" color="white" variant="solid"> {{ modalPayload.bio }}</UBadge>
              <USkeleton v-else class="h-4 w-[200px]" />
            </div>
          </div>

          <UButton color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost" @click="modalService.close(ModalName.Profile)" />
        </div>
      </template>

      <ChartApp :title="t('chart.friends-stat.title')">
        <ChartProfile :datasets="modalPayload.datasets" :labels="modalPayload.labels" />
      </ChartApp>

      <template #footer>
        <div class="flex items-start justify-end">
          <UButton
            v-if="modalPayload.isFriend === FRIENDS_STATUS.FOLLOWED || modalPayload.isFriend === FRIENDS_STATUS.FRIENDS"
            :label="t('modal.delete-friend.delete')"
            class="mt-1"
            color="red"
            icon="i-heroicons-trash"
            size="xs"
            variant="outline"
            @click="$emit('delete:friend', modalPayload.username)"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
