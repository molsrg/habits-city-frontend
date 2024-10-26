import { defineStore } from 'pinia';

import { userService } from '@/api/ApiService';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    isValidUserName: false,
    isExistUserPhone: false,
  }),
  getters: {
    getIsValidUsername(state): boolean {
      return state.isValidUserName;
    },
    getIsExistUserPhone(state): boolean {
      return state.isExistUserPhone;
    },
  },
  actions: {
    async existUsername(username: string): Promise<boolean> {
      try {
        const { data } = await userService.get('/user/isTaken', {
          username,
        });
        this.isValidUserName = data;
      } catch (e) {
      }
    },

    async existUserPhone(userPhone: string) {
      return true;
    },
  },
});
