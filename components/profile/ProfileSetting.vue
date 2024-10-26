<template>
  <div class="profile-setting">
    <div class="profile-setting__photo">
      <UAvatar
        :alt="userInfo.username || '' "
        :src="userInfo.avatar || ''"
        chip-position="bottom-right"
        size="3xl"
      />
      <InputFileUpload
        :label="$t('page--profile.settings-option.upload-avatar')"
        file-type="img"
        icon="i-heroicons-user-circle"
        @upload:file="onFileChange" />
    </div>

    <ProfileInputItem
      v-for="(field) in fields"
      :key="field.name"
      v-model="modifiedUserInfo[field.name]"
      :description="field.description"
      :errors="field.errors"
      :input-type="field.inputType"
      :is-disabled="field.disabled"
      :label="field.label"
    />

    <UButton
      :class="['profile-setting__save-button', { 'profile-setting__save-button--visible': hasChanges && !hasErrors }]"
      :disabled="!hasChanges || hasErrors"
      :label="$t('page--profile.save-data')"
      @click="saveDataUser"
    />
  </div>
</template>

<script lang="ts" setup>
import { debounce, isEqual } from 'lodash';
import { useRouter } from 'vue-router';

import { useApiStore } from '@/store/api.store';

const { locale, t } = useI18n();
const apiStore = useApiStore();
const router = useRouter();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['save:data', 'new:avatar']);

const modifiedUserInfo = ref({ ...props.userInfo });
const fields = reactive([
  {
    name: 'username',
    disabled: false,
    errors: computed(() => {
      const errors = [];
      if (apiStore.getIsValidUsername) errors.push(t('alerts.errors.username.taken'));
      if (modifiedUserInfo.value.username?.length === 0) errors.push(t('alerts.errors.username.empty'));
      return errors;
    }),
    label: t('page--profile.settings-option.username'),
    inputType: 'text',
    description: 'Your username is visible to all users',
  },
  {
    name: 'email',
    disabled: true,
    errors: computed(() => {
      const errors = [];
      if (modifiedUserInfo.value.email?.length === 0) errors.push(t('alerts.errors.email.empty'));
      return errors;
    }),
    label: t('page--profile.settings-option.email'),
    inputType: 'email',
    description: 'You can @mention other users and organizations to link to them.',
  },
]);

const onFileChange = (file) => {
  emit('new:avatar', file);
};

const hasChanges = computed(() => {
  const { avatar, ...otherFields } = props.userInfo;
  const { avatar: originalAvatar, ...originalOtherFields } = modifiedUserInfo.value;
  return !isEqual(otherFields, originalOtherFields);
});

const hasErrors = computed(() => {
  return fields.some(field => field.errors.length > 0);
});

const checkUsername = debounce(async (newUsername) => {
  await apiStore.existUsername(newUsername);
}, 300);

watchEffect(() => {
  if (props.userInfo.username !== modifiedUserInfo.value.username) {
    checkUsername(modifiedUserInfo.value.username);
  }
});

const saveDataUser = () => {
  emit('save:data', modifiedUserInfo.value);

};

router.beforeEach((to, from, next) => {
  if (!hasErrors.value && !hasChanges.value) {
    next();
  } else {
    next(false);
  }
});
</script>

<style scoped>
.profile-setting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  &__photo {
    padding: 10px 20px;
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
}
</style>
