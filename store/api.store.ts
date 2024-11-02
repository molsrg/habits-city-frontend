import { defineStore } from 'pinia';

import { userService } from '@/services/api.service';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    isValidUserName: false,
  }),
  getters: {
    getIsValidUsername(state): boolean {
      return state.isValidUserName;
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
  },
});
