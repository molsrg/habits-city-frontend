<template>
  <div class="auth">
    <LogInWithPhone />
    <div class="auth-form">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <UButton
              :label="$t('page--login.no-account')"
              color="primary"
              variant="link"
              @click="pushToRegPage"
            />
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ $t('page--login.title') }}
            </h3>
          </div>
          <span class="auth-form-subtitle"> {{ $t('page--login.subtitle') }}</span>
        </template>
        <div class="auth-form-input">
          <UInput
            v-model="userData.username"
            :placeholder="$t('page--login.enter-username')"
            icon="i-heroicons-user-circle-20-solid"
            name="username"
          />

          <UInput
            v-model="userData.password"
            :placeholder="$t('page--login.enter-password')"
            icon="i-heroicons-lock-closed-solid"
            name="username"
            type="password"
          />

          <div class="auth-form-error">
            <UBadge
              v-if="appStore.errorLogInText"
              :label="appStore.errorLogInText"
              color="red"
              size="xs"
              variant="subtle"
            />
          </div>
        </div>

        <UButton
          :disabled="!userData.password.length || !userData.username.length"
          :label="$t('page--login.title')"
          :loading="appStore.isLoadingLogIn"
          class="auth-btn--login"
          color="black"
          icon="i-heroicons-finger-print-20-solid"
          @click="logInUser"
        />

        <UDivider label="OR" />
        <div class="auth-btn">
          <!--					<UButton-->
          <!--						block-->
          <!--						icon="i-heroicons-phone-20-solid"-->
          <!--						variant="soft"-->
          <!--						label="LogIn using your phone number"-->
          <!--						@click="logInUserWithPhone"-->
          <!--					/>-->
          <div class="auth-btn--flex">
            <UButton color="white" label="Yandex" variant="solid" @click="logInUserWithYandex">
              <template #leading>
                <Icon name="brandico:yandex-rect" />
              </template>
            </UButton>
            <UButton color="white" label="Google" variant="solid" @click="logInUserWithGoogle">
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

<script lang="ts" setup>
import { useAuthStore } from '../../store/auth.store';
import { useAppStore } from '../../store/app.store';

import LogInWithPhone from '../components/modal/LogInWithPhone.vue';
import getGoogleURL from '../../utils/getGoogleURL';

definePageMeta({
  middleware: ['guest'],
});

useHead({
  title: 'HS | Auth',
});

const config = useRuntimeConfig();
const authStore = useAuthStore();
const appStore = useAppStore();
const toast = useToast();
appStore.$reset();

const userData = reactive({
  username: '',
  password: '',
});

const logInUser = () => {
  authStore.logInWithPassword(userData);
};

const logInUserWithPhone = () => {
  appStore.toggleIsLogInWithPhone();
};

const logInUserWithYandex = () => {
  window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.public.clientIdYandex}`;
};

const logInUserWithGoogle = () => {
  window.location.href = getGoogleURL();
};

const pushToRegPage = () => {
  const router = useRouter();
  appStore.sendErrorLogInText('');
  router.push('/auth/registration');
};
</script>

<style scoped>
.auth {
  margin-top: 17vh;
}

.auth-form {
  width: 350px;
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

.auth-btn--login {
  display: flex;
  margin: 8px auto 10px;
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
