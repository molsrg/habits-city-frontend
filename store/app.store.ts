import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
export const useAppStore = defineStore('appStore', {
	state: () => ({
		isOpenVerificatedPhone: false,
		isOpenLogInWithPhone: false,

		errorRegMessage: '',
		errorLogInMessage: '',

		loadingReg: false,
		loadingLogIn: false
	}),
	getters: {
		isVerificatedPhone(state) {
			return state.isOpenVerificatedPhone
		},
		isLogInWithPhone(state) {
			return state.isOpenLogInWithPhone
		},
		errorRegText(state) {
			return state.errorRegMessage
		},
		errorLogInText(state) {
			return state.errorLogInMessage
		},

		isLoadingReg(state){
			return state.loadingReg
		}, 
		isLoadingLogIn(state){
			return state.loadingLogIn
		}
	},
	actions: {
		toggleIsVerificatedPhone() {
			this.isOpenVerificatedPhone = !this.isOpenVerificatedPhone
		},
		toggleIsLogInWithPhone() {
			this.isOpenLogInWithPhone = !this.isOpenLogInWithPhone
		},

		sendErrorRegText(error: string) {
			this.errorRegMessage = error
		},
		sendErrorLogInText(error: string) {
			this.errorLogInMessage = error
		},

		toggleLoadingReg(){
      this.loadingReg = !this.loadingReg
    }, 
		toggleLoadingLogIn(){
      this.loadingLogIn = !this.loadingLogIn
    }
	},
})
