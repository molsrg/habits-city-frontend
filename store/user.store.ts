import { defineStore } from 'pinia';

import { userService } from '@/api/ApiService';
import { endpoints } from '@/api/endpoints';

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
        const { data } = await userService.get(endpoints.user.fetchInfo);
        if (data) this.userInfo = data;
      } catch (error) {
        console.log(error.response?.data || error);
      }
    },

    async changeUserInfo(userInfo: object): Promise<void> {
      console.log('updateUserInfo', userInfo);
      return false;
    },

    async changeUserPassword(userInfo: object): Promise<void> {
      console.log('updateUserInfo', userInfo);
      return true;
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
  },
});
