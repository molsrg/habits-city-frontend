import { defineStore } from 'pinia'

import { useAppStore } from '@/store/app.store'
import { useAuthStore } from '@/store/auth.store'
import { useUserStore } from '@/store/user.store'

export const useTokenStore = defineStore('tokenStore', {
	persist: true,
	state: () => ({
		token: null,
		loggedIn: false,
	}),

	getters: {
		getToken(state) {
			return state.token
		},
		getStatus(state) {
			return state.loggedIn
		},
	},
	actions: {
		setToken(token: any) {
			this.token = token
			this.loggedIn = true
		},
		removeToken() {
			const auth = useAuthStore()
			const app = useAppStore()
			const user = useUserStore()
			auth.$reset()
			app.$reset()
			user.$reset()
			this.$reset()
			return navigateTo('/')
		},
	},
})
