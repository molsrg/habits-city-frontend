import { defineStore } from 'pinia'
import { useTokenStore } from '@/store/token.store'
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
		async fetchUserInfo() {
			const config = useRuntimeConfig()
			const tokenStore = useTokenStore()

			try {
				const response = await $fetch(`${config.public.apiURL}/auth/login`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${tokenStore.getToken}`,
					},
				})

				if (response) {
					console.log(response)
				}
			} catch (error) {
				if (error.response) {
					console.log(error.response)
				}
			}
		},

		async changeUserInfo(userInfo: object): Promise<void> {
			console.log('changeUserInfo', userInfo)
		},

		async deleteAccount(userInfo: string): Promise<void> {
			console.log('deleteAccount', userInfo)
		},
	},
})
