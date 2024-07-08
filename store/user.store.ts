import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth.store'

export const useUserStore = defineStore('userStore', {
	// persist: {
  //   storage: persistedState.localStorage,
  // },
	state: () => ({
		userInfo: {},
	}),
	getters: {
		getUserInfo(state) {
			return state.userInfo
		},
	},
	actions: {
		getUserInfoFromServer(userInfo: any) {
			this.userInfo = userInfo
		},
		async changeUser() {
			// PUT user info on server
			const phoneNumber: string = this.userInfo.phoneNumber
			const updatedUserData: { name: string; username: string } = {
				name: this.userInfo.name,
				username: this.userInfo.username,
			}

			const response = await fetch(
				'https://outside-projec-default-rtdb.firebaseio.com/users.json'
			)
			const usersData = await response.json()

			const usersArray = Object.entries(usersData)
			let userToUpdate: { [key: string]: any } | null = null
			let key: string | null = null

			for (const [k, user] of usersArray) {
				if (user.phoneNumber === phoneNumber) {
					userToUpdate = { ...user, ...updatedUserData }
					key = k
					break
				}
			}

			await fetch(
				`https://outside-projec-default-rtdb.firebaseio.com/users/${key}.json`,
				{
					method: 'PUT',
					body: JSON.stringify(userToUpdate),
				}
			)

			console.log('Update user on Firebase')
		},
		async changeUserAvatar(avatarURL: string): Promise<void> {
			const phoneNumber: string = this.userInfo.phoneNumber

			// Получить данные пользователя
			const response = await fetch(
				'https://outside-projec-default-rtdb.firebaseio.com/users.json'
			)
			const usersData = await response.json()

			// Найти пользователя, которого нужно обновить
			let userToUpdate: User | null = null
			let key: string | null = null
			for (const [k, user] of Object.entries(usersData)) {
				if (user.phoneNumber === phoneNumber) {
					userToUpdate = { ...user, avatar: { src: avatarURL } }
					key = k
					break
				}
			}

			// Обновить данные пользователя
			if (userToUpdate && key) {
				await fetch(
					`https://outside-projec-default-rtdb.firebaseio.com/users/${key}.json`,
					{
						method: 'PUT',
						body: JSON.stringify(userToUpdate),
					}
				)
				console.log('Avatar updated on Firebase')
			} else {
				console.error('User not found')
			}

			this.userInfo.avatar.src = avatarURL
		},

		async deleteAccount() {
			const phoneNumber: string = this.userInfo.phoneNumber

			// Получить данные пользователя
			const response = await fetch(
				'https://outside-projec-default-rtdb.firebaseio.com/users.json'
			)
			const usersData = await response.json()

			// Найти пользователя, которого нужно удалить
			let key: string | null = null
			for (const [k, user] of Object.entries(usersData)) {
				if (user.phoneNumber === phoneNumber) {
					key = k
					break
				}
			}

			// Удалить данные пользователя
			if (key) {
				await fetch(
					`https://outside-projec-default-rtdb.firebaseio.com/users/${key}.json`,
					{
						method: 'DELETE',
					}
				)
				console.log('User deleted from Firebase')

				//Выйти из аккаунта после удаления
				const authStore = useAuthStore()
				authStore.logout()
			} else {
				console.error('User not found')
			}
		},
	},
})
