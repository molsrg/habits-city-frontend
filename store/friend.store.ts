import { defineStore } from 'pinia';

import { endPoints } from '@/constants/endPoints';
import { authService, userService } from '@/services/api.service';


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
    async addNewFriend(username) {
      console.log(username);
    },
    async fetchSuggestedFriends(payload) {
      const { data } = await userService.get('user/searchUsers', {
        username: payload,
      });
      this.suggestedFriends = data;
    },

  },
});
