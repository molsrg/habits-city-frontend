import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
export const useAppStore = defineStore('appStore', {
	state: () => ({
		isOpenVerificatedPhone: false,

		errorRegMessage: '',
    errorLogInMessage: '',

	}),
	getters: {
		isVerificatedPhone(state) {
			return state.isOpenVerificatedPhone
		},
		errorRegText(state) {
			return state.errorRegMessage
		},
    errorLogInText(state) {
			return state.errorLogInMessage
		},
	},
	actions: {
		toggleIsVerificatedPhone() {
			this.isOpenVerificatedPhone = !this.isOpenVerificatedPhone
		},

		sendErrorRegText(error: string) {
			this.errorRegMessage = error
		},
    sendErrorLogInText(error: string) {
			this.errorLogInMessage = error
		},

		reload() {
			const authStore = useAuthStore()
			authStore.reload()
		},
	},
})
