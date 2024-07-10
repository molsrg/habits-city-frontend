import { defineStore } from 'pinia'
import { useUserStore } from '@/store/user.store'
import { useAppStore } from '@/store/app.store'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', {
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
			try {
				const response = await axios.post(
					'http://localhost:5000/auth/registration',
					userData,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
			} catch (error) {
				console.log(error)

				if (error?.response?.data?.errors?.errors) {
					appStore.sendErrorRegText(error.response.data.errors.errors[0].msg)
				}
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

			try {
				const response = await axios.post(
					`${config.public.apiURL}/auth/login`,
					userData
				)

				if (response.status === 200) {
					document.cookie =
						'TOKEN=' + response.data.token + ';max-age=' + 60 * 60 * 24 * 7
					// + ';httpOnly'

					const router = useRouter()
					router.push('/profile')
				}
			} catch (error) {
				if (error?.response?.data?.message) {
					appStore.sendErrorLogInText(error?.response?.data?.message)
				}
			}
		},

		// Метод для запроса кода на сервере
		async logInWithPhoneNumber(userPhone: string) {
			console.log(userPhone)

			const response = '1234'
			this.logInWithOTPCode = response
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
