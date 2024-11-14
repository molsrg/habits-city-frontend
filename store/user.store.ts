import { defineStore } from 'pinia';

import { endPoints } from '@/constants/endPoints';
import { authService, userService } from '@/services/api.service';
import { useTokenStore } from '@/store/token.store';

export const useUserStore = defineStore('userStore', {
  persist: true,
  state: () => ({
    userInfo: {
      username: '',
      email: '',
      password: '',
      avatar: '',
      isOauth: null,
      roles: [],
    },
  }),

  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  actions: {
    async fetchUserInfo(): Promise<void> {
      try {
        const { data } = await userService.get(endPoints.user.fetchInfo);
        if (data) this.userInfo = data;
      } catch (error) {
        console.log(error.response?.data || error);
      }
    },

    async changeUserInfo(userInfo: object): Promise<void> {
      console.log('updateUserInfo', userInfo);
      return false;
    },

    async changeUserPassword(userInfo: object): Promise<number> {
      const payload = {
        oldPassword: userInfo.password,
        newPassword: userInfo.new_password,
      };

      const tokenStore = useTokenStore();
      let statusCode = null; // Инициализируем со значением по умолчанию (например, 500 для ошибки сервера)

      try {
        const { data } = await userService.post(endPoints.user.changePassword, payload);

        // Удаление токена и перенаправление на страницу логина
        tokenStore.removeToken();
        navigateTo('/auth/login');

        statusCode = data.statusCode; // Обновляем статус код при успешном запросе

      } catch (error) {
        if (error.response && error.response.status) {
          statusCode = error.response.status;
        }

      } finally {
        return statusCode;
      }
    },


    async uploadNewAvatar(payload: File): Promise<void> {
      try {
        const formData = new FormData();
        formData.append('avatar', payload);

        const { data } = await userService.postFormData('/user/changeAvatar', formData);
        this.userInfo.avatar = data.url;
        return true;

      } catch (e) {
        console.log(e);
        return false;
      }
    },


    async deleteAccount(userInfo: string): Promise<void> {
      console.log('deleteAccount', userInfo);
    },


    async sendEmailCode(payload: object): Promise<void> {
      try {
        const { data } = await userService.post(endPoints.user.sendEmailCode, payload);
        console.log(data);
      } catch (error) {
        if (error.response && error.response.status) {
          console.log(error.response);
        }
      }
    },
    async verifyEmailCode(payload: object): Promise<void> {
      try {
        const { data } = await userService.post(endPoints.user.verifyEmailCode, payload);
        console.log(data);
      } catch (error) {
        if (error.response && error.response.status) {
          console.log(error.response);
        }
      }
    },
  },
});
