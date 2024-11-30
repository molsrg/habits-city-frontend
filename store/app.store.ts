import { endPoints } from '@/constants/endPoints';
import { friendService } from '@/services/api.service';

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

    async sendSupportTicket(payload: object) {
      await friendService.post(endPoints.app.support, { ...payload });
    },
  },
});
