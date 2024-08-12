import { defineStore } from 'pinia'

export const useApiStore = defineStore('apiStore', {
	state: () => ({
		isValidUserName: false,
		isExistUserPhone: false,
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
			const names = [
				'user1',
				'user2',
				'user3',
				'user4',
				'user5',
				'user6',
				'user7',
				'user8',
				'user9',
				'user10',
				'user11',
				'user12',
				'user13',
				'user14',
				'user15',
				'user16',
				'user17',
			]
			const usernameExists = names.some((user: string) => username === user)
			this.isValidUserName = usernameExists
			return usernameExists
		},

		async existUserPhone(userPhone: string) {
			return true
		},
	},
})
