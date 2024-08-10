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


		async changeUserInfo(userInfo: object): Promise<void> {
			console.log('changeUserInfo', userInfo)
		},

		async deleteAccount(userInfo: string): Promise<void> {
			console.log('deleteAccount', userInfo)
		}
	},
	
})
