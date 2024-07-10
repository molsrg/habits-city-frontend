import { defineStore } from 'pinia'
// import { useAuthStore } from '@/store/auth.store'

export const useUserStore = defineStore('userStore', {
	state: () => ({
		userInfo: {},
	}),
	getters: {
		getUserInfo(state) {
			return state.userInfo
		},
	},
	actions: {
		async fetchUserInfo() {},
	},
})
