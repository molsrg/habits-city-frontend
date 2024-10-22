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
    },

    async deleteAccount(userInfo: string): Promise<void> {
      console.log('deleteAccount', userInfo);
    },
  },
});
