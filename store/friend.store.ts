import { defineStore } from 'pinia';

import { authService, userService } from '@/api/ApiService';
import { endpoints } from '@/api/endpoints';


export const useFriendStore = defineStore('friendStore', {
  // persist: true,
  state: () => ({
    isOpenVerificatedPhone: false,
    suggestedFriends: [],
  }),

  getters: {
    isVerificatedPhone(state) {
      return state.isOpenVerificatedPhone;
    },
    getSuggestedFriends(state) {
      return state.suggestedFriends;
    },


  },
  actions: {
    toggleIsVerificatedPhone() {
      this.isOpenVerificatedPhone = !this.isOpenVerificatedPhone;
    },
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
