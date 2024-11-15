<script lang="ts" setup>
import { debounce } from 'lodash';
import { useI18n } from 'vue-i18n';

import { useAccountForm, useAccountTabsForm } from '@/configs/accountForm.ts';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useApiStore } from '@/store/api.store';
import { useAppStore } from '@/store/app.store';

const { t } = useI18n();
const apiStore = useApiStore();

const tabs = useAccountTabsForm();
const accountForm = useAccountForm();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:user-account', 'new:avatar', 'update:user-password', 'link:email', 'update:email']);

const selectedTabs = ref(0);
const activeFields = computed(() => {
  const activeTab = tabs.value[selectedTabs.value];
  if (activeTab) {
    return activeTab.fields.reduce((acc, field) => {
      acc[field] = accountForm.value[field];
      return acc;
    }, {});
  }
  return {};
});

const initialAccountFormField = {
  bio: props.userInfo.bio || null,
  username: props.userInfo.username || null,
  email: props.userInfo.email || null,
  password: null,
  new_password: null,
};

const accountFormField = reactive({ ...initialAccountFormField });

const accountErrors = computed(() => ({
  bio: accountFormField.bio !== null && accountFormField.bio.length === 0
    ? t('alerts.errors.bio.empty')
    : '',

  username: apiStore.getIsValidUsername
    ? t('alerts.errors.username.taken')
    : accountFormField.username !== null && accountFormField.username.length === 0
      ? t('alerts.errors.username.empty')
      : '',

  password: accountFormField.password !== null && accountFormField.password.length === 0
    ? t('alerts.errors.password.empty')
    : null,

  new_password: (() => {
    const field = accountFormField.new_password;
    if (field !== null && field.length === 0) {
      return t('alerts.errors.password.empty');
    } else if (field && field.length < 8) {
      return t('alerts.errors.password.length');
    } else if (field && !/[A-Z]/.test(field)) {
      return t('alerts.errors.password.uppercase');
    } else if (field && !/\d/.test(field)) {
      return t('alerts.errors.password.digit');
    }
    return null;
  })(),
}));

const hasErrors = (fields) => {
  return fields.some(field => {
    const isChanged = accountFormField[field] !== initialAccountFormField[field];
    return (accountErrors.value[field] !== '' && accountErrors.value[field] !== null) || (isChanged && accountFormField[field] === null);
  });
};

const checkUsername = debounce(async (newUsername) => {
  await apiStore.existUsername(newUsername);
}, 300);

watchEffect(() => {
  if (props.userInfo.username !== accountFormField.username) {
    checkUsername(accountFormField.username);
  }
});

const getClickHandler = (action) => {
  switch (action) {
    case 'saveAccount':
      return saveAccountUser();
    case 'savePassword':
      return savePasswordUser();
    case 'deleteAccount':
      return deleteAccount();
    case 'linkEmail':
      emit('link:email');
      return;
    case 'changeEmail':
      emit('update:email');
      return;
    default:
      return null;
  }
};

const saveAccountUser = () => {
  const updatedData = ['bio', 'username'].reduce((acc, field) => {
    if (accountFormField[field] !== props.userInfo[field]) {
      acc[field] = accountFormField[field];
    }
    return acc;
  }, {});

  if (Object.keys(updatedData).length) {
    emit('update:user-account', updatedData);
  }
};

const savePasswordUser = () => {
  const updatedData = {
    password: accountFormField.password,
    new_password: accountFormField.new_password,
  };

  emit('update:user-password', updatedData);
};

const deleteAccount = () => {
  modalService.open(ModalName.DeleteAccount);
};
</script>

<template>
  <UTabs v-model="selectedTabs" :items="tabs" class="w-full">
    <template #item="{ item }">
      <UCard>
        <template #header>
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>
        <div v-if="item.key === 'account'" class="space-y-3">
          <div class="self-start flex items-center gap-5 flex-wrap">
            <UAvatar
              :alt="userInfo.username || '' "
              :src="userInfo.avatar || ''"
              size="3xl"
            />
            <InputFileUpload
              :label="$t('page--profile.settings-option.upload-avatar')"
              color="primary"
              file-type="img"
              icon="i-heroicons-user-circle"
              size="md"
              variant="soft"
              @upload:file="$emit('new:avatar', $event)" />
          </div>
          <div
            v-for="(field, key) in activeFields"
            :key="key">
            <ProfileInputItem
              v-model="accountFormField[key]"
              :actions="field.actions"
              :description="field.description"
              :errors="accountErrors[key]"
              :input-type="field.inputType"
              :is-disabled="field.disabled"
              :label="field.label"
              :placeholder="field.placeholder"
              :required="field.required"
              @handle:action="getClickHandler"
            />
          </div>
        </div>
        <div v-else-if="item.key === 'password'" class="space-y-3">
          <ProfileInputItem
            v-for="(field, key) in activeFields"
            :key="key"
            v-model="accountFormField[key]"
            :errors="accountErrors[key]"
            :input-type="field.inputType"
            :is-disabled="field.disabled"
            :label="field.label"
            :placeholder="field.placeholder"
            :required="field.required"
          />
        </div>
        <template #footer>
          <div class="flex items-center gap-4">
            <UButton
              v-for="button in tabs[selectedTabs].actions"
              :key="button.label"
              :color="button.color"
              :disabled="button.disabled && hasErrors(button.disabled)"
              :icon="button.icon"
              :label="button.label"
              :variant="button.variant"
              @click="getClickHandler(button.action)"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>
