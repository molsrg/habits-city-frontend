<template>
	<div>
		<UModal v-model="appStore.isVerificatedPhone" class="confirm" prevent-close>
			<UCard
				:ui="{
					ring: '',
					divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				}"
			>
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
						>
							Привяжи свой номер телефона
						</h3>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-x-mark-20-solid"
							class="-my-1"
							@click="appStore.toggleIsVerificatedPhone"
						/>
					</div>
				</template>

				<div class="h-21">
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
							<label for="OTP-code">Введи код с телефона</label>
							<InputOtp v-model="OTPcode" integerOnly />
							<AlertApp v-if="isInvalidCode" :label="'неверный код !'" />

							<UButton
								class="confirm-phone--recive"
								color="primary"
								size="xs"
								variant="link"
								@click="errorSendCode"
								>Не пришёл код?</UButton
							>
						</div>
					</div>

					<div class="modal-no-recive-code">
						<UModal v-model="showSecondSendCode">
							<div class="p-2">
								<Stepper linear>
									<StepperPanel header="Шаг 1" key="step1">
										<template #content="{ nextCallback }">
											<div class="auth-modal">
												<h3 class="auth-modal-title">
													Давай проверим твой номер телефона
												</h3>
												<InputMask
													disabled
													class="phone-number"
													v-model="phoneNumber"
													mask="8-999-999-99-99"
													placeholder="8-999-999-99-99"
												/>
												<div class="auth-modal__container-bt">
													<UButton
														label="Нет, вернусь исправлю"
														@click="resetAuthForm"
														color="gray"
													/>
													<UButton
														label="Да, это мой номер"
														@click="nextCallback"
													/>
												</div>
											</div>
										</template>
									</StepperPanel>

									<StepperPanel header="Шаг 2" key="step2">
										<template #content="{}">
											<div class="auth-modal">
												<h3 class="auth-modal-title" style="text-align: center">
													Извини, вероятно с нашими серверами что-то не
													так...Давай попробуем отправить код ещё раз!
												</h3>
												<UButton
													class="mt-2"
													icon="i-heroicons-finger-print-20-solid"
													size="sm"
													color="primary"
													variant="soft"
													label="Отправить СМС"
													@click="sendCodeSecondary"
												/>
											</div>
										</template>
									</StepperPanel>
								</Stepper>
							</div>
						</UModal>
					</div>
				</div>
			</UCard>
		</UModal>

		<!-- <UButton @click="isOpen = !isOpen">Открыть</UButton> -->
	</div>
</template>

<script setup lang="ts">


import { ref, watch, computed } from 'vue'
const isOpenVerificatedPhone = ref(false)

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
	// Запрос кода
	authStore.sendCode(phoneNumber.value)

	// Проверка существует ли пользователь в БД
	apiStore.existUserPhone(phoneNumber.value)
}

// Отправлен ли код?
const codeFromServer = computed(() => {
	return authStore.getOTPcode
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
	// Существует ли номер в БД?
	const isExist = computed(() => {
		return apiStore.getIsExistUserPhone
	})

	// Если да то запрашиваем user
	if (isExist.value) {
		await authStore.getUser()
	}
	// Иначе создаём
	else {
		await authStore.createUser()
	}
	router.push('/profile')
}

const handleInvalidOtpCode = () => {
	if (countInvalidCode.value === 4) {
		console.log('Попытки закончились, код протух')
		resetAuthForm()
		return
	}
	isInvalidCode.value = true
	countInvalidCode.value++
}

// Не пришёл код?
let showSecondSendCode = ref<boolean>(false)

// Открытие модалки "Не пришёл код?"
const errorSendCode = () => {
	showSecondSendCode.value = true
}

// Повторный запрос кода
const sendCodeSecondary = () => {
	authStore.sendCode(phoneNumber.value)
	showSecondSendCode.value = false
}

// Перезагрузка страницы
const resetAuthForm = () => {
	window.location.reload()
}
</script>

<style scoped>
.confirm {
	background-color: #fff;
	width: 110px;
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
	/* text-align: center; */
	/* height: 40px; */
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

.auth-step-1 {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	justify-content: center;
	align-items: center;
}
</style>
