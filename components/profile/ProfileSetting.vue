<template>
  <div class="profile-setting">
    <div class="profile-setting-container">
      <ProfileSettingItem
        v-for="(field) in fields" :key="field.name"
        v-model="userInfo[field.name]"
        :errors="field.errors"
        :inputType="field.inputType"
        :isDisabled="field.disabled"
        :label="field.label"
        class="profile-setting__detail"
        @update:isDisabled="(value) => field.disabled = value"
      />
    </div>
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
import { useApiStore } from '@/store/api.store';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const apiStore = useApiStore();
const router = useRouter();

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save:data']);

const originalUserInfo = ref({ ...props.userInfo });
const fields = reactive([
  {
    disabled: true,
    name: 'username',
    errors: computed(() => {
      const errors = [];
      if (apiStore.getIsValidUsername) errors.push(t('alerts.errors.username.taken'));
      if (props.userInfo.username.length === 0) errors.push(t('alerts.errors.username.empty'));
      return errors;
    }),
    label: t('page--profile.settings-option.username'),
    inputType: 'text',
  },
  {
    disabled: true,
    name: 'email',
    errors: computed(() => {
      const errors = [];
      if (props.userInfo.email.length === 0) errors.push(t('alerts.errors.email.empty'));
      return errors;
    }),
    label: t('page--profile.settings-option.email'),
    inputType: 'email',
  },
  {
    disabled: true,
    name: 'password',
    errors: computed(() => {
      const errors = [];
      if (props.userInfo.password.length === 0) errors.push(t('alerts.errors.password.empty'));
      return errors;
    }),
    label: t('page--profile.settings-option.password'),
    inputType: 'password',
  },
]);

const hasChanges = computed(() => {
  return !isEqual(props.userInfo, originalUserInfo.value);
});

const hasErrors = computed(() => {
  return fields.some(field => field.errors.length > 0);
});

const checkUsername = debounce(async (newUsername) => {
  await apiStore.existUsername(newUsername);
}, 300);

watchEffect(() => {
  if (props.userInfo.username !== originalUserInfo.value.username) {
    checkUsername(props.userInfo.username);
  }
});

const saveDataUser = () => {
  emit('save:data');

  originalUserInfo.value = { ...props.userInfo };
  fields.forEach(field => {
    field.disabled = true;
  });
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
  gap: 20px;
  font-size: 18px;

  &-container {
    display: flex;
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
    pointer-events: none; /* Блокируем события мыши */

    &--visible {
      opacity: 1;
      pointer-events: auto; /* Включаем события мыши, когда кнопка видима */
      transform: translateY(-10px);
    }
  }
}
</style>
