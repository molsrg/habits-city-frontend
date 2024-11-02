<script lang="ts" setup>
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { useTokenStore } from '@/store/token.store';
import type { NuxtError } from '#app';

const tokenStore = useTokenStore();
const authStore = useAuthStore();

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

let accessToken = {
  code: '',
  provider: '',
};

// Google
const tokenGoogle = route.query.code;
if (tokenGoogle) {
  accessToken = {
    code: tokenGoogle,
    provider: 'google',
  };
}

// Yandex
const tokenYandex = new URLSearchParams(route.hash.substring(1));
const accessTokenYandex = tokenYandex.get('access_token');
if (accessTokenYandex) {
  accessToken = {
    code: accessTokenYandex,
    provider: 'yandex',
  };
}

if (import.meta.client && accessToken) {
  await authStore.oAuthUser(accessToken);
}
const props = defineProps({
  error: Object as () => NuxtError,
});
const handleError = () => clearError({ redirect: '/auth/login' });


// Переопределение метода console.warn
const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (!message.includes('The selector')) {
    originalWarn(message, ...args);
  }
};
</script>
<template>
  <div>
    <div v-if="!appStore.errorOAuthText" class="pending">
      <h3 class="text-xl">Wait for the authorization!</h3>

      <span class="loader" />
    </div>
    <div v-else class="pending-error">
      <h3 class="text-xl">{{ appStore.errorOAuthText }}</h3>
      <UButton
        color="white"
        variant="solid"
        @click="handleError"
      >Go back login
      </UButton>
    </div>
  </div>
</template>
<style scoped>
.pending {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 40px;
  padding: 20px;
}

.pending-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 20px;
}

.loader {
  width: 68px;
  height: 68px;
  border: 5px solid #fff;
  border-bottom-color: #4ade80;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
