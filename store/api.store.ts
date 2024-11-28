import { endPoints } from '@/constants/endPoints';
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
      const { data } = await userService.get(endPoints.user.validUsername, { username });
      this.isValidUserName = data.isTaken;
    },
  },
});
