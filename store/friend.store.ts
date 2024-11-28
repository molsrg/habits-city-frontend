import { endPoints } from '@/constants/endPoints';
import { friendService, userService } from '@/services/api.service';

export const useFriendStore = defineStore('friendStore', {
  state: () => ({
    suggestedFriends: [],
    batch: 0,
  }),

  getters: {
    getSuggestedFriends(state) {
      return state.suggestedFriends;
    },
    batchCount(state) {
      return state.batch;
    },
  },
  actions: {
    async fetchFriendInfo(username): Promise<void> {
      const { data } = await userService.get(endPoints.friend.fetchInfo, { username: username });
      return data;
    },

    async addNewFriend(username) {
      console.log(username);
    },
    
    async deleteFriend(username) {
      console.log(username);
    },

    async fetchFriendsChunk(payload) {
      this.batch++;
      const { data } = await friendService.get(endPoints.friend.searchUsers, { ...payload, batch: this.batch });
      this.suggestedFriends.push(...data);
    },

    async fetchFriends(payload) {
      this.batch = 0;
      const { data } = await friendService.get(endPoints.friend.searchUsers, { ...payload, batch: this.batch });
      this.suggestedFriends = data;
    },
  },
});
