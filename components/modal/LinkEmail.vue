<script lang="ts" setup>
import StepperProgressBar from '@/components/stepper/StepperProgressBar.vue';
import { useLinkEmailForm } from '@/configs/linkEmailForm';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useUserStore } from '@/store/user.store';

const { t } = useI18n();
const isOpenModal = computed(() => modalService.isOpen(ModalName.LinkEmail));
const currentStep = ref(0);
const formConfig = useLinkEmailForm();
const totalSteps = Object.keys(formConfig.value.stepper.steps).length;
const userStore = useUserStore();
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

const newEmail = ref(null);

const verifyCode = ref('');

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
const errorsEmail = ref([]);
const isSendEmail = ref(false);
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errorsEmail.value = [];
  isSendEmail.value = false;

  if (newEmail.value !== null && newEmail.value.length === 0) {
    errorsEmail.value.push(t('alerts.errors.email.empty'));
  } else if (newEmail.value !== null && !emailRegex.test(newEmail.value)) {
    errorsEmail.value.push(t('alerts.errors.email.invalid'));
  }
};
watch(newEmail, validateEmail);

const isNextButtonDisabled = computed(() => {
  return errorsEmail.value.length > 0;
});

const nextStep = async () => {
  if (currentStep.value === 0) {
    isSendEmail.value = true;
    const result = await userStore.sendEmailCode({ email: newEmail.value });
    if (result) {
      errorsEmail.value.push(result);
    }
  }
  if (currentStep.value === 1) {
    await userStore.verifyEmailCode({ code: verifyCode.value });
  }

  if (currentStep.value < totalSteps - 1) {
    if (errorsEmail.value.length === 0)
      currentStep.value++;
    isSendEmail.value = false;
  }
};
</script>


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

      <div class="flex align-center justify-center">
        <ProfileInputItem
          v-if="currentStep=== 0"
          v-model="newEmail"
          :errors="errorsEmail[0]"
          :placeholder="t('modal.link-email.steppers.enter-email')"
          style="width:60%" />
        <InputOtp v-if="currentStep=== 1" v-model="verifyCode" :length="6" integer-only />
      </div>


      <template #footer>
        <div class="flex justify-between">
          <UButton
            v-for="button in formConfig.stepper.actions"
            :key="button.label"
            :color="button.color"
            :disabled="(button.action === 'next' ? isNextButtonDisabled : false) || isSendEmail"
            :label="button.label"
            :variant="button.variant"
            @click="getClickHandler(button.action)"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>


