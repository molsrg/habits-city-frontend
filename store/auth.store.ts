import { defineStore } from 'pinia';

import { authService } from '@/api/ApiService';
import { endpoints } from '@/api/endpoints';
import { useAppStore } from '@/store/app.store';
import { useTokenStore } from '@/store/token.store';

export const useAuthStore = defineStore('authStore', {
  persist: true,
  state: () => ({
    logInWithOTPCode: '',
    phoneNumber: '',
  }),
  getters: {
    getOTPCodeLogin(state): string {
      return state.logInWithOTPCode;
    },
    getUserPhone(state): string {
      return state.phoneNumber;
    },
  },
  actions: {
    async createUser(userData: object): Promise<void> {
      const appStore = useAppStore();
      const tokenStore = useTokenStore();
      const router = useRouter();

      appStore.sendErrorRegText('');
      appStore.toggleLoadingReg();

      try {
        const { data } = await authService.post(endpoints.auth.registration, userData);

        if (data?.AccessToken) {
          sessionStorage.setItem('RefreshToken', data.RefreshToken);
          sessionStorage.setItem('AccessToken', data.AccessToken);

          tokenStore.setToken(data.AccessToken);
          router.push('/profile');
        } else {
          throw new Error('Token not received');
        }
      } catch (error) {
        appStore.sendErrorRegText(error.response?.data?.message || 'Unknown error');
      } finally {
        appStore.toggleLoadingReg();
      }
    },
    async logInWithPassword(payload: object): Promise<void> {
      const appStore = useAppStore();
      const tokenStore = useTokenStore();
      const router = useRouter();

      appStore.toggleLoadingLogIn();
      appStore.sendErrorLogInText('');

      try {
        const { data } = await authService.post(endpoints.auth.login, payload);
        if (data?.AccessToken) {
          sessionStorage.setItem('AccessToken', data.AccessToken);
          tokenStore.setToken(data.AccessToken);
          router.push('/profile');
        } else {
          throw new Error('Token not received');
        }
      } catch (error) {
        appStore.sendErrorLogInText(error.response?.data?.message || 'Unknown error');
      } finally {
        appStore.toggleLoadingLogIn();
      }
    },


    // async oAuthUser(userToken: object) {
    //   const config = useRuntimeConfig();
    //   const tokenStore = useTokenStore();
    //   const appStore = useAppStore();
    //   const router = useRouter();
    //   try {
    //     const tokenResponse = await axios.get(
    //       `${config.public.apiURL}/auth/${userToken.provider}`,
    //       {
    //         params: {
    //           code: userToken.code,
    //         },
    //       },
    //     );
    //
    //     sessionStorage.setItem('AccessToken', tokenResponse.data.AccessToken);
    //     tokenStore.setToken(tokenResponse.data.AccessToken);
    //     router.push('/profile');
    //   } catch (error) {
    //     console.error('Error fetching token:', error);
    //     appStore.sendErrorOAuthText(error?.data?.message);
    //   }
    // },
    //
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
