export const useAppStore = defineStore('appStore', {
  state: () => ({
    errorOAuthMessage: '',
  }),

  getters: {
    errorOAuthText(state) {
      return state.errorOAuthMessage;
    },
  },
  actions: {
    sendErrorOAuthText(error: string) {
      this.errorOAuthMessage = error;
    },
  },
});
