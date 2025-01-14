import { endPoints } from '@/constants/endPoints';
import { friendService } from '@/services/api.service';

export const useFriendStore = defineStore('friendStore', {
  state: () => ({
    suggestedFriends: [],
    batch: 0,
    loadingChunk: false,
  }),

  getters: {
    getSuggestedFriends(state) {
      return state.suggestedFriends;
    },
    batchCount(state) {
      return state.batch;
    },
    isLoadingChunk(state) {
      return state.loadingChunk;
    },
  },
  actions: {
    async fetchFriendInfo(username): Promise<void> {
      const [fetchInfoResponse, friendStatResponse] = await Promise.all([
        friendService.get(endPoints.friend.fetchInfo, { username }),
        friendService.get(endPoints.friend.friendStat, { username }),
      ]);

      const fetchInfoData = fetchInfoResponse.data;
      const friendStatData = friendStatResponse.data;

      return { ...fetchInfoData, ...friendStatData };
    },

    async addNewFriend(username) {
      await friendService.post(endPoints.friend.addFriend, { username: username });
    },

    async deleteFriend(username) {
      console.log(username);
    },

    async fetchFriendsChunk(payload) {
      this.loadingChunk = true;
      this.batch++;
      const { data } = await friendService.get(endPoints.friend.searchUsers, { ...payload, batch: this.batch });
      this.suggestedFriends.push(...data);
      this.loadingChunk = false;
    },

    async fetchFriends(payload) {
      this.batch = 0;
      const { data } = await friendService.get(endPoints.friend.searchUsers, { ...payload, batch: this.batch });
      this.suggestedFriends = data;
    },
  },
});
