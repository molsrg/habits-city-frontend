import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
	persist: true,
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
