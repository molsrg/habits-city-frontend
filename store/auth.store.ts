import { defineStore } from 'pinia'
import { useUserStore } from '@/store/user.store'
import { useTokenStore } from '@/store/token.store'

import { useAppStore } from '@/store/app.store'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', {
	persist: true,
	state: () => ({
		logInWithOTPCode: '',
		phoneNumber: '',
	}),
	getters: {
		getOTPCodeLogin(state): string {
			return state.logInWithOTPCode
		},

		getUserPhone(state): string {
			return state.phoneNumber
		},
	},
	actions: {
		async createUser(userData: object): Promise<any> {
			const appStore = useAppStore()
			appStore.sendErrorRegText('')
			appStore.toggleLoadingReg()
			try {
				const config = useRuntimeConfig()
				const response = await axios.post(
					`${config.public.apiURL}/auth/registration`,
					userData
				)

				if (response.status === 200) {
					// sessionStorage.setItem('jwt_token', response.data.token)
					const router = useRouter()
					router.push('/profile')
				}
			} catch (error) {
				console.dir(error)

				if (error?.response?.data?.message) {
					appStore.sendErrorRegText(error?.response?.data?.message)
				}
			} finally {
				appStore.toggleLoadingReg()
			}

			// const appStore = useAppStore()
			// const userStore = useUserStore()

			// userStore.getUserInfoFromServer(response)

			// if (!response.phone) {
			// 	appStore.toggleIsVerificatedPhone()
			// }
		},

		async logInWithPassword(userData: object) {
			const config = useRuntimeConfig()
			const appStore = useAppStore()
			appStore.sendErrorLogInText('')
			appStore.toggleLoadingLogIn()

			try {
				const response = await axios.post(
					`${config.public.apiURL}/auth/login`,
					userData
				)

				if (response.status === 200) {
					sessionStorage.setItem('jwt_token', response.data.token)
					const tokenStore = useTokenStore()
					tokenStore.setToken(response.data.token)
					const router = useRouter()
					router.push('/profile')
				}
			} catch (error) {
				if (error?.response?.data?.message) {
					appStore.sendErrorLogInText(error?.response?.data?.message)
				}
			} finally {
				appStore.toggleLoadingLogIn()
			}
		},

		// Метод для запроса кода на сервере
		async logInWithPhoneNumber(userPhone: string) {
			const userData = { phone: userPhone }
			const response = '1234'
			this.logInWithOTPCode = response

			const config = useRuntimeConfig()

			try {
				const response = await axios.post(
					`${config.public.apiURL}/auth/login`,
					userData
				)


				console.log(response)
			} catch (error) {
				console.log(error)
			}
		},

		// Сброс OTP code
		reloadOTP() {
			this.logInWithOTPCode = ''
		},

		// Выход из системы
		logout() {
			this.logInWithOTPCode = ''

			const router = useRouter()
			router.push('/')
		},
	},
})
