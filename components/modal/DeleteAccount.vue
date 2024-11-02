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
          <div class="flex items-start justify-between flex-col">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Delete Account
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              To delete your account, please enter your username below.
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

      <div class="delete-form">
        <InputText
          v-model="deleteUsernameInput"
          class="phone-number"
          placeholder="Input your username"
          type="text"
        />
        <UButton
          :disabled="deleteUsernameInput !== props.username"
          color="red"
          label="Delete Account"
          variant="solid"
          @click="deleteAccount"
        />
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { modalService } from '@/services/modal.service';
import { useAppStore } from '@/store/app.store';
import { useUserStore } from '@/store/user.store';
import { ModalName } from '@/values/modalName';

const appStore = useAppStore();
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


const deleteAccount = () => {
  userStore.deleteAccount(deleteUsernameInput.value);
  deleteUsernameInput.value = '';
  appStore.toggleIsDeleteAccount();
};
</script>

<style scoped>
.delete-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
}
</style>
