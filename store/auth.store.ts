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
		async oAuthUser(userToken: object) {
			const config = useRuntimeConfig()
			const tokenStore = useTokenStore()
			const appStore = useAppStore()
			const router = useRouter()
			try {
				const tokenResponse = await axios.get(
					`${config.public.apiURL}/auth/${userToken.provider}`,
					{
						params: {
							code: userToken.code,
						},
					}
				)

				sessionStorage.setItem('AccessToken', tokenResponse.data.AccessToken)
				tokenStore.setToken(tokenResponse.data.AccessToken)
				router.push('/profile')
			} catch (error) {
				console.error('Error fetching token:', error)
				appStore.sendErrorOAuthText(error?.data?.message)
			}
		},

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
					const tokenStore = useTokenStore()
					const router = useRouter()

					console.log(response.data)

					sessionStorage.setItem('RefreshToken', response.data.RefreshToken)
					sessionStorage.setItem('AccessToken', response.data.AccessToken)

					tokenStore.setToken(response.data.AccessToken)
					router.push('/profile')
				}
			} catch (error) {
				if (error?.response?.data?.message) {
					appStore.sendErrorRegText(error?.response?.data?.message)
				}
			} finally {
				appStore.toggleLoadingReg()
			}
		},

		async logInWithPassword(userData: object): Promise<any> {
			const config = useRuntimeConfig()
			const appStore = useAppStore()
			const tokenStore = useTokenStore()
			const router = useRouter()

			appStore.sendErrorLogInText('')
			appStore.toggleLoadingLogIn()

			try {
				const response = await $fetch(`${config.public.apiURL}/auth/login`, {
					method: 'POST',
					body: userData,
					credentials: 'include', 
				})

				if (response) {
					// sessionStorage.setItem('RefreshToken', response.RefreshToken);
					sessionStorage.setItem('AccessToken', response.AccessToken)

					tokenStore.setToken(response.AccessToken)
					router.push('/profile')
				}
			} catch (error) {
				if (error.response) {
					const errorData = error.response._data
					appStore.sendErrorLogInText(errorData.message)
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
	},
})
