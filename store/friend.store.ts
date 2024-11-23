import { defineStore } from 'pinia';

import { endPoints } from '@/constants/endPoints';
import { friendService, userService } from '@/services/api.service';

export const useFriendStore = defineStore('friendStore', {
  // persist: true,
  state: () => ({
    suggestedFriends: [],
  }),

  getters: {
    getSuggestedFriends(state) {
      return state.suggestedFriends;
    },
  },
  actions: {
    async fetchFriendInfo(username): Promise<void> {
      const { data } = await userService.get(endPoints.user.fetchInfo);
      return data;
    },

    async addNewFriend(username) {
      console.log(username);
    },
    async fetchSuggestedFriends(payload) {
      const { data } = await friendService.get(endPoints.friend.searchUsers, payload);
      this.suggestedFriends = data;
    },
  },
});
