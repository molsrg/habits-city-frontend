import { defineStore } from 'pinia'


export const useApiStore = defineStore('apiStore', {
	// persist: {
  //   storage: persistedState.localStorage,
  // },
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

			const response = await fetch(
				`https://outside-projec-default-rtdb.firebaseio.com/users.json`
			)

			const data = await response.json()
			const users = Object.values(data)
			const usernameExists = users.some(
				(user: any) => user.username === username
			)
			this.isValidUserName = usernameExists
			return usernameExists
		},


		async existUserPhone(userPhone: string) {
			const response = await fetch(
				`https://outside-projec-default-rtdb.firebaseio.com/users.json`
			)

			const data: { [key: string]: { phoneNumber: string } } =
				await response.json()
			const users: { phoneNumber: string }[] = Object.values(data)
			const phoneExists: boolean = users.some(
				user => user.phoneNumber === userPhone
			)

			this.isExistUserPhone = phoneExists
		},
	},
})
