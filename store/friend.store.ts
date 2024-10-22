import { defineStore } from 'pinia';
import { authService, userService } from '@/api/ApiService';
import { endpoints } from '@/api/endpoints';


export const useFriendStore = defineStore('friendStore', {
  persist: true,
  state: () => ({
    isOpenVerificatedPhone: false,
    suggestedFriends: [
      {
        username: 'CoolCat123',
        isOnline: true,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'SunnyDays789',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: false,
      },
      {
        username: 'GamerGuru456',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'MysticMoon234',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      {
        username: 'TechTiger987',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'LuckyLady654',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      {
        username: 'NinjaNerd321',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'StarStruck123',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      {
        username: 'PixelPioneer789',
        isOnline: true,
        hasAvatar: '',
        inFriends: true,
      },
      {
        username: 'EpicEagle456',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: false,
      },
      {
        username: 'DreamDancer234',
        isOnline: true,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'CraftyCoder987',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      {
        username: 'HappyHiker654',
        isOnline: true,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'BraveBear321',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      { username: 'FunnyFox123', isOnline: true, hasAvatar: '', inFriends: true },
      {
        username: 'CreativeCloud789',
        isOnline: false,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: false,
      },
      {
        username: 'WiseWolf456',
        isOnline: true,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'MagicMouse234',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
      {
        username: 'AdventureAce987',
        isOnline: true,
        hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
        inFriends: true,
      },
      {
        username: 'PeacefulPanda654',
        isOnline: false,
        hasAvatar: '',
        inFriends: false,
      },
    ],
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
    fetchSuggestedFriends(payload) {
      console.log(payload);
      // const { data } = await userService.get(`/recommended-friends`, {
      //   username: payload
      // });
    },

  },
});
