import { defineStore } from 'pinia'
import { useUserStore } from '@/store/user.store'

export const useAuthStore = defineStore('authStore', {
	state: () => ({



		isLogin: false,
		OTP_code: '',
		phoneNumber: '',
	}),
	getters: {
		getOTPcode(state): string {
			return state.OTP_code
		},

		getUserPhone(state): string {
			return state.phoneNumber
		},

		getIsLogin(state): boolean {
			return state.isLogin
		},
	},
	actions: {
		createUser(userData:object):void {
			console.log(userData)
		},

		// async createUser(): Promise<any> {
		// 	const randomUserName = () => {
		// 		const randomNumber = Math.floor(100000 + Math.random() * 900000)
		// 		return `User ${randomNumber}`
		// 	}

		// 	const userName = randomUserName()

		// 	const user = {
		// 		name: userName,
		// 		username: userName,
		// 		avatar: {
		// 			src: 'https://avatars.githubusercontent.com/u/739984?v=4',
		// 		},
		// 		rating: 100,
		// 		phoneNumber: this.phoneNumber,
		// 	}

		// 	const res = await fetch(
		// 		'https://outside-projec-default-rtdb.firebaseio.com/users.json',
		// 		{
		// 			method: 'POST',
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 			},
		// 			body: JSON.stringify(user),
		// 		}
		// 	)
		// 	const userStore = useUserStore()
		// 	userStore.getUserInfoFromServer(user)

		// 	this.isLogin = true
		// 	localStorage.setItem('isLogin', 'true')
		// 	localStorage.setItem('phone', this.phoneNumber)
		// 	console.log('Create user by Firebase')
		// },







		reload(){
      this.OTP_code = ''
		},


		// middleware при первом заходе на сайт
		checkLogin() {
			if (process.client) {
				const isLoginFromLS = localStorage.getItem('isLogin')

				if (isLoginFromLS) {

				}
			}
		},

		async getUserAgain(): Promise<void> {
			const response = await fetch(
				`https://outside-projec-default-rtdb.firebaseio.com/users.json`
			)

			const data = await response.json()
			const users = Object.values(data)
			const user = users.find(
				(user: any) => user.phoneNumber === localStorage.getItem('phone')
			)

			this.isLogin = true
			const userStore = useUserStore()
			userStore.getUserInfoFromServer(user)
			console.log('Get user from Firebase again')
		},

		logout() {
			this.isLogin = false
			this.OTP_code = ''
			localStorage.removeItem('isLogin')

			const router = useRouter()
			router.push('/')
		},

		// Запрос кода на сервисе
		sendCode(phoneNumber: string): void {
			this.phoneNumber = phoneNumber
			// GET SEND CODE FROM SERVER
			this.OTP_code = '1234'
		},

		async getUser(): Promise<void> {
			const response = await fetch(
				`https://outside-projec-default-rtdb.firebaseio.com/users.json`
			)

			const data = await response.json()
			const users = Object.values(data)
			const user = users.find(
				(user: any) => user.phoneNumber === this.phoneNumber
			)

			const userStore = useUserStore()
			userStore.getUserInfoFromServer(user)

			this.isLogin = true
			localStorage.setItem('isLogin', 'true')
			localStorage.setItem('phone', this.phoneNumber)
			console.log('Get user from Firebase')
		},


	},
})
