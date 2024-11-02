<template>
  <UModal v-model="isOpenModal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header>
        <div class="flex flex-col">
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {{ formConfig.title }}
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                {{ formConfig.description }}
              </p>
            </div>
            <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="modalService.close(ModalName.LinkEmail)"
            />
          </div>
          <StepperProgressBar :current-step="currentStep" :steps="stepTitles" />
        </div>
      </template>

      {{ formConfig.stepper }}

      <template #footer>
        <div class="flex justify-between">
          <UButton
            v-for="button in formConfig.stepper.actions"
            :key="button.label"
            :color="button.color"
            :label="button.label"
            :variant="button.variant"
            @click="getClickHandler(button.action)"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import StepperProgressBar from '@/components/StepperProgressBar.vue';
import { useLinkEmailForm } from '@/helpers/linkEmailForm';
import { modalService } from '@/services/modal.service';
import { ModalName } from '@/values/modalName';

const isOpenModal = computed(() => modalService.isOpen(ModalName.LinkEmail));
const currentStep = ref(0);
const formConfig = useLinkEmailForm();
const totalSteps = Object.keys(formConfig.value.stepper.steps).length;

const stepTitles = computed(() => {
  return Object.values(formConfig.value.stepper.steps).map(step => step.title);
});

const getClickHandler = (action) => {
  switch (action) {
    case 'prev':
      return prevStep();
    case 'next':
      return nextStep();
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  }
};
</script>
