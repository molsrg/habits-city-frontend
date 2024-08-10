import { defineStore } from 'pinia'
export const useAppStore = defineStore('appStore', {
	persist: true,
	state: () => ({
		isOpenVerificatedPhone: false,
		isOpenLogInWithPhone: false,
		isOpenDeleteAccount: false,

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

		isDeleteAccount(state) {
			return state.isOpenDeleteAccount
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
		toggleIsDeleteAccount() {
			this.isOpenDeleteAccount = !this.isOpenDeleteAccount
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
