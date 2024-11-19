<script lang="ts" setup>
import { useAccountForm, useAccountSocialNetworks, useAccountTabsForm } from '@/configs/accountForm.ts';
import { useApiStore } from '@/store/api.store';

const { t } = useI18n();
const apiStore = useApiStore();

const tabs = useAccountTabsForm();
const accountForm = useAccountForm();
const socialNetworks = useAccountSocialNetworks();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'update:user-account',
  'new:avatar',
  'update:user-password',
  'link:email',
  'delete:account',
  'check:username',
  'link:social',
]);

// Reactive tabs settings
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
  bio: props.userInfo.bio || undefined,
  username: props.userInfo.username || null,
  email: props.userInfo.email || null,
  password: undefined,
  new_password: undefined,
});

const accountErrors = computed(() => ({
  bio: accountFormField.bio !== undefined && accountFormField.bio.length === 0 ? t('alerts.errors.bio.empty') : '',

  username: apiStore.getIsValidUsername
    ? t('alerts.errors.username.taken')
    : accountFormField.username !== null && accountFormField.username.length === 0
      ? t('alerts.errors.username.empty')
      : '',

  password: accountFormField.password !== undefined && accountFormField.password.length === 0 ? t('alerts.errors.password.empty') : null,

  new_password: (() => {
    const field = accountFormField.new_password;
    if (field !== undefined && field.length === 0) {
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
  if (!Array.isArray(fields)) return false;

  const changedFields = fields.filter((field) => accountFormField[field] !== props.userInfo[field]);
  if (changedFields.length === 0) return true;
  return changedFields.some((field) => accountErrors.value[field]);
};

// Actions
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

watchEffect(() => {
  if (props.userInfo.username !== accountFormField.username && accountFormField.username && props.userInfo.username) {
    emit('check:username', accountFormField.username);
  }
});

// Link Social Networks
const socialNetworkButtons = computed(() => {
  return socialNetworks.value.map((network) => {
    const isLinked = props.userInfo[network.linkedKey];
    return {
      ...network,
      disabled: isLinked,
      tooltip: isLinked ? network.tooltipHasSocial : network.tooltip,
      color: isLinked ? network.colorHasSocial : network.color,
    };
  });
});

// Click handler configs
const getClickHandler = (button) => {
  switch (button.action) {
    case 'saveAccount':
      return saveAccountUser();
    case 'savePassword':
      return savePasswordUser();
    case 'deleteAccount':
      emit('delete:account');
      return;
    case 'linkEmail':
      emit('link:email');
      return;
    case 'linkYandex':
      emit('link:social', button);
      return;
    case 'linkGoogle':
      emit('link:social', button);
      return;
    default:
      return null;
  }
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
          <div class="flex flex-wrap items-center gap-5 self-start">
            <UAvatar :alt="userInfo.username || ''" :src="userInfo.avatar || ''" size="3xl" />
            <InputFileUpload
              :label="$t('page--profile.settings-option.upload-avatar')"
              color="primary"
              file-type="img"
              icon="i-heroicons-user-circle"
              size="md"
              variant="soft"
              @upload:file="$emit('new:avatar', $event)"
            />
          </div>
          <div v-for="(field, key) in activeFields" :key="key">
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

          <div class="flex gap-2">
            <UTooltip v-for="button in socialNetworkButtons" :key="button.key" :text="button.tooltip" @click="getClickHandler(button)">
              <UButton :color="button.color" :disabled="button.disabled" :label="button.label" :variant="button.variant">
                <Icon :name="button.icon" />
              </UButton>
            </UTooltip>
            <UButton
              color="blue"
              label="Button"
              size="sm"
              style="display: none"
              variant="soft" />
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
              :disabled="hasErrors(button.disabled)"
              :icon="button.icon"
              :label="button.label"
              :variant="button.variant"
              @click="getClickHandler(button)"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>
