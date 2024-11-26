<script lang="ts" setup>
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import getGoogleURL from '@/utils/getGoogleURL';

const { t } = useI18n();
definePageMeta({
  middleware: ['guest'],
});

const title = computed(() => `HS | ${t('nav--layout.registration')}`);

useHead({
  title,
});

const config = useRuntimeConfig();
const authStore = useAuthStore();
const appStore = useAppStore();
appStore.$reset();

const userData = reactive({
  username: '',
  password: '',
});

const hasError = ref(false);

// Actions
const registerUser = async () => {
  const res = await authStore.createUser(userData);
  hasError.value = !res;
};
const RegUserWithYandex = () => {
  window.location.href = config.public.clientIdYandex;
};

const RegUserWithGoogle = () => {
  window.location.href = getGoogleURL();
};
const pushToLogInPage = () => {
  const router = useRouter();
  router.push('/auth/login');
};
</script>
<template>
  <div class="auth">
    <div :class="[hasError ? 'auth-form--error' : '']" class="auth-form">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ $t('page--registration.title') }}
            </h3>
            <UButton :label="$t('page--registration.have-account')" color="primary" variant="link" @click="pushToLogInPage" />
          </div>
          <span class="auth-form-subtitle"> {{ $t('page--registration.subtitle') }}</span>
        </template>
        <div class="auth-form-input">
          <UInput
            v-model="userData.username"
            :placeholder="$t('page--registration.enter-username')"
            icon="i-heroicons-user-circle-20-solid"
            name="username"
          />

          <UInput
            v-model="userData.password"
            :placeholder="$t('page--registration.enter-password')"
            icon="i-heroicons-lock-closed-solid"
            name="username"
            type="password"
          />
        </div>

        <UButton
          :disabled="!userData.password.length || !userData.username.length"
          :label="$t('page--registration.button')"
          class="auth-btn--reg"
          color="black"
          icon="i-heroicons-user-plus-20-solid"
          @click="registerUser"
        />

        <UDivider label="OR" />
        <div class="auth-btn">
          <div class="auth-btn--flex">
            <UButton color="white" label="Yandex" variant="solid" @click="RegUserWithYandex">
              <template #leading>
                <Icon name="brandico:yandex-rect" />
              </template>
            </UButton>
            <UButton color="white" label="Google" variant="solid" @click="RegUserWithGoogle">
              <template #leading>
                <Icon name="tabler:brand-google-filled" />
              </template>
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  margin-top: 17vh;
  display: flex;
  justify-content: center;
}

.auth-form {
  width: 370px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgb(var(--color-primary-400));

  transition: all 500ms linear;
}

.auth-form--error {
  border: 1px solid rgb(248 113 113);
}

.auth-form-subtitle {
  font-size: 12px;
  color: rgb(var(--color-gray-400));
}

.auth-form-input {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.auth-btn {
  display: flex;
  flex-direction: column;
  margin: 8px auto 10px;
  gap: 8px;
}

.auth-btn--reg {
  display: flex;
  margin: 12px auto 10px;
}

.auth-btn--flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.auth-form-error {
  margin: auto;
  max-width: 258.25px;
  text-align: center;
}
</style>
