import { defineStore } from 'pinia'

export const useApiStore = defineStore('apiStore', {
	state: () => ({
		isValidUserName: false,
		isExistUserPhone: false,
		currentUsername: '',
	}),
	getters: {
		getIsValidUsername(state): boolean {
			return state.isValidUserName
		},
		getIsExistUserPhone(state): boolean {
			return state.isExistUserPhone
		},
	},
	actions: {
		async existUsername(
			username: string,
			initialUsername: string
		): Promise<boolean> {
			if (username === initialUsername) {
				return false
			}

			return true
		},

		async existUserPhone(userPhone: string) {
			return true
		},
	},
})
