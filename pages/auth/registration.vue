<template>
	<div class="auth">
		<div
			class="auth-form"
			:class="[appStore.errorRegText ? 'auth-form--error' : '']"
		>
			<UCard>
				<template #header>
					<div class="flex items-center justify-between">
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
						>
							Registry
						</h3>
						<UButton
							color="primary"
							variant="link"
							label="Already have an account?"
							@click="pushToLogInPage"
						/>
					</div>
					<span class="auth-form-subtitle"
						>Enter your credentials to access your account.</span
					>
				</template>
				<div class="auth-form-input">
					<UInput
						v-model="userData.username"
						name="username"
						placeholder="Enter your username"
						icon="i-heroicons-user-circle-20-solid"
					/>

					<UInput
						v-model="userData.password"
						name="username"
						placeholder="Enter your password"
						icon="i-heroicons-lock-closed-solid"
						type="password"
					/>

					<div class="auth-form-error">
						<UBadge
							color="red"
							variant="subtle"
							:label="appStore.errorRegText"
							size="xs"
							v-if="appStore.errorRegText"
						/>
					</div>
				</div>

				<UButton
					class="auth-btn--reg"
					icon="i-heroicons-user-plus-20-solid"
					color="black"
					label="Register"
					@click="registerUser"
					:disabled="!userData.password.length || !userData.username.length"
					:loading="appStore.isLoadingReg"
				/>


				<UDivider label="OR" />
				<div class="auth-btn">
					<div class="auth-btn--flex">
						<UButton
							icon="i-heroicons-globe-alt"
							variant="solid"
							color="white"
							label="Yandex"
							@click="RegUserWithYandex"
						/>
						<UButton
							icon="i-heroicons-lock-closed"
							variant="solid"
							color="white"
							label="Google"
							@click="RegUserWithGoogle"
						/>
					</div>
				</div>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
const toast = useToast()
definePageMeta({
  middleware: [
    'guest',
  ],
});

useHead({
  title: 'HS | Auth'
})
import { useAuthStore } from '../../store/auth.store'
import { useAppStore } from '../../store/app.store'
import { reactive } from 'vue'
import getGoogleURL from '../../utils/getGoogleURL'
const authStore = useAuthStore()
const appStore = useAppStore()
appStore.$reset()
const userData = reactive({
	username: '',
	password: '',
})

const loadingData = ref(false)

const registerUser = () => {
	authStore.createUser(userData)
	loadingData.value = true
}

const RegUserWithYandex = () => {
	const config = useRuntimeConfig()
	window.location.href=(`https://oauth.yandex.ru/authorize?response_type=token&client_id=${config.public.clientIdYandex}`);
}

const RegUserWithGoogle = () => {
	window.location.href=getGoogleURL();

	
}
const pushToLogInPage = () => {
	const router = useRouter()
	appStore.sendErrorRegText('')
	router.push('/auth/login')
}
</script>

<style scoped>
.auth {
	margin-top: 17vh;
}

.auth-form {
	padding: 20px;
	border-radius: 10px;
	border: 1px solid rgb(var(--color-primary-400));

	transition: all 500ms linear;
}

.auth-form--error {
	border: 1px solid rgb(248 113 113);
}

.auth-form-subtitle {
	font-size: 12px;
	color: rgb(var(--color-gray-400));
}

.auth-form-input {
	display: flex;
	flex-direction: column;
	row-gap: 8px;
}


.auth-btn {
	display: flex;
	flex-direction: column;
	margin: 8px auto 10px;
	gap: 8px;
}

.auth-btn--reg {
	display: flex;
	margin: 8px auto 10px;
}

.auth-btn--flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 10px;
}

.auth-form-error {
	margin: auto;
	max-width: 258.25px;
	text-align: center;
}
</style>
