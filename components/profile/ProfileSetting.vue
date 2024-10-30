<script lang="ts" setup>
import { debounce } from 'lodash';

import { useAccountForm, useAccountTabsForm } from '@/helpers/accountForm.ts';
import { useApiStore } from '@/store/api.store';
import { useAppStore } from '@/store/app.store';

const { t } = useI18n();
const apiStore = useApiStore();
const appStore = useAppStore();
const tabs = useAccountTabsForm();
const accountForm = useAccountForm();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:user-account', 'new:avatar', 'update:user-password']);

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

const accountFormField = reactive({
  name: props.userInfo.name || null,
  username: props.userInfo.username || null,
  password: null,
  new_password: null,
});

const accountErrors = computed(() => ({
  name: accountFormField.name !== null && accountFormField.name.length === 0
    ? t('alerts.errors.name.empty')
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
  return fields.some(field => accountErrors.value[field] !== '' && accountErrors.value[field] !== null);
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
    default:
      return null;
  }
};

const saveAccountUser = () => {
  const updatedData = ['name', 'username'].reduce((acc, field) => {
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
  appStore.toggleIsDeleteAccount();
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
          <div class="profile-setting__photo">
            <UAvatar
              :alt="userInfo.username || '' "
              :src="userInfo.avatar || ''"
              size="3xl"
            />
            <InputFileUpload
              :label="$t('page--profile.settings-option.upload-avatar')"
              file-type="img"
              icon="i-heroicons-user-circle"
              @upload:file="$emit('new:avatar', $event)" />
          </div>

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
          <div class="profile-setting__actions">
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


<style scoped>
.profile-setting {
  &__photo {
    //padding: 10px 20px;
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__actions {
    //background-color: #fff;
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
