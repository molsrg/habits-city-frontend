import { defineStore } from 'pinia';

import { endPoints } from '@/constants/endPoints';
import { ModalName } from '@/constants/modalName';
import { authService, userService } from '@/services/api.service';
import { modalService } from '@/services/modal.service';
import { useTokenStore } from '@/store/token.store';

export const useUserStore = defineStore('userStore', {
  persist: true,
  state: () => ({
    userInfo: {
      username: '',
      email: '',
      password: '',
      avatar: '',
      isGoogle: false,
      isYandex: false,
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
      const payload: Record<string, unknown> = {};
      if (userInfo.username !== undefined) {
        payload.newUsername = userInfo.username;
      }

      if (userInfo.bio !== undefined) {
        payload.newBio = userInfo.bio;
      }

      await userService.post(endPoints.user.changeInfo, payload);
      await this.fetchUserInfo();
    },

    async changeUserPassword(userInfo: object): Promise<number> {
      const payload = {
        oldPassword: userInfo.password,
        newPassword: userInfo.new_password,
      };

      const tokenStore = useTokenStore();
      let statusCode = null;

      try {
        const { data } = await userService.post(endPoints.user.changePassword, payload);

        tokenStore.removeToken();
        navigateTo('/auth/login');

        statusCode = data.statusCode;
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
        await userService.post(endPoints.user.sendEmailCode, payload);
        return;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async verifyEmailCode(payload: object): Promise<void> {
      try {
        await userService.post(endPoints.user.verifyEmailCode, payload);
        await this.fetchUserInfo();
        modalService.close(ModalName.LinkEmail);
      } catch (error) {
        if (error.response && error.response.status) {
          console.log(error.response);
        }
      }
    },
  },
});
