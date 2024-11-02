import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  persist: true,
  state: () => ({
    errorRegMessage: '',
    errorLogInMessage: '',
    errorOAuthMessage: '',

    loadingReg: false,
    loadingLogIn: false,
  }),

  getters: {
    errorRegText(state) {
      return state.errorRegMessage;
    },
    errorLogInText(state) {
      return state.errorLogInMessage;
    },
    errorOAuthText(state) {
      return state.errorOAuthMessage;
    },

    isLoadingReg(state) {
      return state.loadingReg;
    },
    isLoadingLogIn(state) {
      return state.loadingLogIn;
    },
  },
  actions: {
    sendErrorRegText(error: string) {
      this.errorRegMessage = error;
    },
    sendErrorLogInText(error: string) {
      this.errorLogInMessage = error;
    },
    sendErrorOAuthText(error: string) {
      this.errorOAuthMessage = error;
    },

    toggleLoadingReg() {
      this.loadingReg = !this.loadingReg;
    },
    toggleLoadingLogIn() {
      this.loadingLogIn = !this.loadingLogIn;
    },
  },
});
