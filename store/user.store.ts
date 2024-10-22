import { defineStore } from 'pinia';

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
        // const { data } = await userService.get(endpoints.user.fetchInfo);
        // if (data) this.userInfo = data;
        this.userInfo = {
          username: 'qwd',
          email: 'qd',
          password: 'qwd',
        };
      } catch (error) {
        console.log(error.response?.data || error);
      }
    },

    async changeUserInfo(userInfo: object): Promise<void> {
      console.log('updateUserInfo', userInfo);
      this.userInfo = userInfo;
      return false;
    },
    async deleteAccount(userInfo: string): Promise<void> {
      console.log('deleteAccount', userInfo);
    },
  },
});
