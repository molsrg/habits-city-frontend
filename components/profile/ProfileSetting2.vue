<script lang="ts" setup>
import { debounce, isEqual } from 'lodash';

import { useApiStore } from '@/store/api.store';
import { useAppStore } from '@/store/app.store';

const { t } = useI18n();
const apiStore = useApiStore();
const appStore = useAppStore();
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:user-account', 'new:avatar', 'update:user-password']);

const items = computed(() => [
  {
    key: 'account',
    label: t('page--profile.settings-option.nav.account.label'),
    description: t('page--profile.settings-option.nav.account.description'),
  },
  {
    key: 'password',
    label: t('page--profile.settings-option.nav.password.label'),
    description: t('page--profile.settings-option.nav.password.description'),
  },
]);
const accountForm = reactive({
  name: {
    model: props.userInfo.name || null,
    disabled: false,
    required: false,
    placeholder: t('page--profile.settings-option.name.placeholder'),
    errors: computed(() =>
      (accountForm.name.model !== null && accountForm.name.model.length === 0)
        ? t('alerts.errors.name.empty')
        : null,
    ),
    label: t('page--profile.settings-option.name.label'),
    inputType: 'text',
    description: t('page--profile.settings-option.name.description'),
  },
  username: {
    model: props.userInfo.username,
    disabled: false,
    required: true,
    placeholder: t('page--profile.settings-option.username.placeholder'),
    errors: computed(() => (apiStore.getIsValidUsername) ? t('alerts.errors.username.taken') : (accountForm.username.model.length === 0) ? t('alerts.errors.username.empty') : null),
    label: t('page--profile.settings-option.username.label'),
    inputType: 'text',
    description: t('page--profile.settings-option.username.description'),
  },
});

const passwordForm = reactive({
  password: {
    model: null,
    disabled: false,
    required: true,
    placeholder: t('page--profile.settings-option.password.placeholder'),
    errors: computed(() =>
      (passwordForm.password.model !== null && passwordForm.password.model.length === 0)
        ? t('alerts.errors.password.empty')
        : null,
    ),
    label: t('page--profile.settings-option.password.label'),
    inputType: 'password',
  },
  new_password: {
    model: null,
    disabled: false,
    required: true,
    placeholder: t('page--profile.settings-option.new-password.placeholder'),
    errors: computed(() => {
      const field = passwordForm.new_password.model;
      return (field !== null && field.length === 0) ? t('alerts.errors.password.empty') :
        (field && field.length < 8) ? t('alerts.errors.password.length') :
        (field && !/[A-Z]/.test(field)) ? t('alerts.errors.password.uppercase') :
        (field && !/\d/.test(field)) ? t('alerts.errors.password.digit') : null;
    }),
    label: t('page--profile.settings-option.new-password.label'),
    inputType: 'password',
    description: t('page--profile.settings-option.new-password.description'),
  },
});


const hasChanges = computed(() => {
  return !isEqual(
    { name: accountForm.name.model, username: accountForm.username.model },
    { name: props.userInfo.name, username: props.userInfo.username },
  );
});

const hasAccountErrors = computed(() => {
  return Object.values(accountForm).some(field => field.errors);
});


const hasPasswordErrors = computed(() => {
  return Object.values(passwordForm).some(field => !field.model || field.errors);
});


const checkUsername = debounce(async (newUsername) => {
  await apiStore.existUsername(newUsername);
}, 300);

watchEffect(() => {
  if (props.userInfo.username !== accountForm.username.model) {
    checkUsername(accountForm.username.model);
  }
});

const saveDataUser = () => {
  const updatedData = ['name', 'username'].reduce((acc, field) => {
    if (accountForm[field].model !== props.userInfo[field]) {
      acc[field] = accountForm[field].model;
    }
    return acc;
  }, {});

  if (Object.keys(updatedData).length) {
    emit('update:user-account', updatedData);
  }
};


const updateUserPassword = () => {
  const updatedData = {
    password: passwordForm.password.model,
    new_password: passwordForm.new_password.model,
  };

  emit('update:user-password', updatedData);
};


</script>

<template>
  <UTabs :items="items" class="w-full">
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
            v-for="(field) in accountForm"
            :key="field"
            v-model="field.model"
            :description="field.description"
            :errors="field.errors"
            :input-type="field.inputType"
            :is-disabled="field.disabled"
            :label="field.label"
            :placeholder="field.placeholder"
            :required="field.required"
          />

        </div>
        <div v-else-if="item.key === 'password'" class="space-y-3">
          <ProfileInputItem
            v-for="(field) in passwordForm"
            :key="field"
            v-model="field.model"
            :description="field.description"
            :errors="field.errors"
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
              v-if="item.key === 'account'"
              :disabled="!hasChanges || hasAccountErrors"
              :label="$t('page--profile.save-account')"
              color="black"
              type="submit"
              @click="saveDataUser" />
            <UButton
              v-if="item.key === 'password'"
              :disabled="!hasChanges || hasPasswordErrors"
              :label="$t('page--profile.save-password')"
              color="black"
              type="submit"
              @click="updateUserPassword" />
            <UButton
              v-if="item.key === 'account'"
              :label="$t('page--profile.delete-account')"
              class="profile__delete-button"
              color="red"
              icon="i-heroicons-trash"
              variant="outline"
              @click="appStore.toggleIsDeleteAccount"
            />
          </div>

        </template>
      </UCard>
    </template>
  </UTabs>
</template>


<style scoped>
.profile-setting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &__photo {
    //padding: 10px 20px;
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    row-gap: 10px;
    column-gap: 30px;
    flex-wrap: wrap;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    row-gap: 5px;
  }

  &__save-button {
    opacity: 0;
    transition: all 0.5s ease-in-out;
    pointer-events: none;

    &--visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(-10px);
    }
  }

  &__actions {
    //background-color: #fff;
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
