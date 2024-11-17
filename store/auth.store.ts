import { defineStore } from 'pinia';

import { endPoints } from '@/constants/endPoints';
import { authService } from '@/services/api.service';
import { useAppStore } from '@/store/app.store';
import { useTokenStore } from '@/store/token.store';

export const useAuthStore = defineStore('authStore', {
  persist: true,
  state: () => ({}),
  getters: {},
  actions: {
    async createUser(userData: object): Promise<void> {
      const tokenStore = useTokenStore();
      const router = useRouter();

      try {
        const { data } = await authService.post(endPoints.auth.registration, userData);

        if (data?.AccessToken) {
          sessionStorage.setItem('AccessToken', data.AccessToken);
          tokenStore.setToken(data);
          await router.push('/profile');
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    async logInWithPassword(payload: object): Promise<void> {
      const tokenStore = useTokenStore();
      const router = useRouter();

      try {
        const { data } = await authService.post(endPoints.auth.login, payload);
        if (data?.AccessToken) {
          sessionStorage.setItem('AccessToken', data.AccessToken);
          tokenStore.setToken(data.AccessToken);
          await router.push('/profile');
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    async oAuthUser(userToken: { provider: string; code: string }): Promise<void> {
      const tokenStore = useTokenStore();
      const appStore = useAppStore();
      const router = useRouter();

      try {
        const { data } = await authService.get(`/auth/${userToken.provider}`, {
          code: userToken.code,
        });

        sessionStorage.setItem('AccessToken', data.AccessToken);
        tokenStore.setToken(data.AccessToken);
        router.push('/profile');
      } catch (error) {
        console.error('Error fetching token:', error);
        appStore.sendErrorOAuthText(error?.response?.data?.message || 'Unknown error');
      }
    },

    // Метод для запроса кода на сервере
    // async logInWithPhoneNumber(userPhone: string) {
    //   const userData = { phone: userPhone };
    //   const response = '1234';
    //   this.logInWithOTPCode = response;
    //
    //   const config = useRuntimeConfig();
    //
    //   try {
    //     const response = await axios.post(
    //       `${config.public.apiURL}/auth/login`,
    //       userData,
    //     );
    //
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    //
    // // Сброс OTP code
    // reloadOTP() {
    //   this.logInWithOTPCode = '';
    // },
  },
});
