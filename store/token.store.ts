import { defineStore } from 'pinia';

import { authService } from '@/services/api.service';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';

export const useTokenStore = defineStore('tokenStore', {
  persist: true,
  state: () => ({
    token: null,
    loggedIn: false,
  }),

  getters: {
    getToken(state) {
      return state.token;
    },
    getStatus(state) {
      return state.loggedIn;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      this.loggedIn = true;
    },

    async updateToken(): Promise<void> {
      try {
        const { data } = await authService.get('/auth/updateToken', {
          withCredentials: true,
        });
        console.log(data);
        sessionStorage.setItem('AccessToken', data.AccessToken);
        this.setToken(data.AccessToken);
      } catch (error) {
        console.error('Failed to update token:', error);
      }
    },
    removeToken() {
      const auth = useAuthStore();
      const app = useAppStore();
      const user = useUserStore();
      auth.$reset();
      app.$reset();
      user.$reset();
      this.$reset();

      return navigateTo('/');
    },
  },
});
