<template>
	<div>
		<UModal v-model="appStore.isLogInWithPhone">
			<UCard
				:ui="{
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-3 text-gray-900 dark:text-white"
						>
							LogIn using one-time password
						</h3>

						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="appStore.toggleIsLogInWithPhone"
						/>
					</div>
					<span class="login-subtitle">
						...you must have a verified phone number in your account...</span
					>
				</template>

				<div class="confirm-step" v-if="!codeFromServer">
					<div class="confirm-phone">
						<InputMask
							class="phone-number"
							v-model="phoneNumber"
							mask="8-999-999-99-99"
							placeholder="8-999-999-99-99"
							id="otp"
						/>
					</div>

					<UButton
						:disabled="!phoneNumber.length"
						icon="i-heroicons-finger-print-20-solid"
						size="sm"
						color="primary"
						variant="soft"
						label="Отправить СМС"
						@click="sendCode"
					/>
				</div>

				<div class="confirm-step" v-if="codeFromServer">
					<div class="confirm-phone">
						<label for="OTP-code">Enter the code from your phone</label>
						<InputOtp v-model="OTPcode" integerOnly />
						<AlertApp v-if="isInvalidCode" :label="'incorrect code!'" />

						<UButton
							class="confirm-phone--recive"
							color="primary"
							size="xs"
							variant="link"
							@click="showSecondSendCode = !showSecondSendCode"
							>Didn't receive the code?</UButton
						>
					</div>
				</div>

				<div class="modal-no-recive-code">
					<UModal v-model="showSecondSendCode">
						<div class="auth-modal p-4" v-if="!confirmNumber">
							<h3 class="auth-modal-title">Let's check your phone number</h3>
							<InputMask
								disabled
								class="phone-number"
								v-model="phoneNumber"
								mask="8-999-999-99-99"
								placeholder="8-999-999-99-99"
							/>
							<div class="auth-modal__container-bt">
								<UButton
									label="I'll come back and fix it"
									@click="resetAuthForm"
									color="gray"
								/>
								<UButton
									label="That's my number"
									@click="confirmNumber = !confirmNumber"
								/>
							</div>
						</div>

						<div class="auth-modal p-4" v-else>
							<h3 class="auth-modal-title" style="text-align: center">
								Sorry, there's probably something wrong with our servers so...
								Let's try sending the code again!
							</h3>
							<UButton
								class="mt-2"
								icon="i-heroicons-finger-print-20-solid"
								size="sm"
								color="primary"
								variant="soft"
								label="Send SMS"
								@click="sendCodeSecondary"
							/>
						</div>
					</UModal>
				</div>
			</UCard>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { useAuthStore } from '@/store/auth.store'
import { useApiStore } from '@/store/api.store'
import { useAppStore } from '@/store/app.store'

import AlertApp from '@/components/alerts/AlertApp'

const router = useRouter()
const authStore = useAuthStore()
const apiStore = useApiStore()
const appStore = useAppStore()

// Номер телефона пользователя
const phoneNumber = ref<string>('')

// Запрос кода на сервере
const sendCode = () => {
	authStore.logInWithPhoneNumber(phoneNumber.value)
}

// Отправлен ли код?
const codeFromServer = computed(() => {
	return authStore.getOTPCodeLogin
})

// Проверка введенного кода и подсчет ошибок
const OTPcode = ref<string>('')
let isInvalidCode = ref<boolean>(false)
let countInvalidCode = ref<number>(0)

// Отслеживание введённого ОТП кода
watch(OTPcode, checkOtpCode)

function checkOtpCode(newValue: string) {
	if (newValue.length !== 4) {
		isInvalidCode.value = false
		return
	}
	if (newValue === codeFromServer.value) {
		handleValidOtpCode()
	} else {
		handleInvalidOtpCode()
	}
}

const handleValidOtpCode = async () => {
	appStore.toggleIsLogInWithPhone()
	authStore.reloadOTP()
	router.push('/profile')
}

const handleInvalidOtpCode = () => {
	if (countInvalidCode.value === 4) {
		console.log('Попытки закончились, код протух')
		return
	}
	isInvalidCode.value = true
	countInvalidCode.value++
}

// Не пришёл код?
const showSecondSendCode = ref<boolean>(false)
const confirmNumber = ref<boolean>(false)

// Повторный запрос кода
const sendCodeSecondary = () => {
	authStore.logInWithPhoneNumber(phoneNumber.value)
	confirmNumber.value = false
	showSecondSendCode.value = false
}
</script>

<style scoped>
.login-subtitle {
	font-size: 12px;
	color: rgb(var(--color-gray-400));
}

.confirm-step {
	display: flex;
	flex-direction: column;
	row-gap: 8px;
	align-items: center;
	justify-content: center;
}

.confirm-phone {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 5px;
	flex-wrap: wrap;
}

.confirm-phone--recive {
	margin-left: auto;
}

.phone-number {
	font-family: 'Rubik', sans-serif;
	text-align: center;
	width: 180px;
	height: 40px;
	border: 1px solid rgb(184, 178, 178);
	border-radius: 10px;
}

.auth-modal {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 10px;
}

.auth-modal__container-bt {
	display: flex;
	column-gap: 7px;
	row-gap: 7px;
}
</style>
