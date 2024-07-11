<template>
	<div class="auth">
		<LogInWithPhone />
		<div class="auth-form">
			<UCard>
				<template #header>
					<div class="flex items-center justify-between">
						<UButton
							color="primary"
							variant="link"
							label="Don't have an account yet?"
							@click="pushToRegPage"
						/>
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
						>
							LogIn
						</h3>
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
							:label="appStore.errorLogInText"
							size="xs"
							v-if="appStore.errorLogInText"
						/>
					</div>
				</div>

				<UButton
					class="auth-btn"
					icon="i-heroicons-finger-print-20-solid"
					color="black"
					label="LogIn"
					@click="logInUser"
					:disabled="!userData.password.length || !userData.username.length"
					:loading="appStore.isLoadingLogIn"
				/>

				<UDivider label="OR" />

				<UButton
					class="auth-btn"
					icon="i-heroicons-phone-20-solid"
					variant="soft"
					label="LogIn using your phone number"
					@click="logInUserWithPhone"
				/>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    'guest',
  ],
});
import { useAuthStore } from '../../store/auth.store'
import { useAppStore } from '../../store/app.store'

import LogInWithPhone from '../components/modal/LogInWithPhone.vue'

import { reactive } from 'vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const userData = reactive({
	username: '',
	password: '',
})

const logInUser = () => {
	authStore.logInWithPassword(userData)
}

const logInUserWithPhone = () => {
	appStore.toggleIsLogInWithPhone()
}

const pushToRegPage = () => {
	const router = useRouter()
	appStore.sendErrorLogInText('')
	router.push('/auth/registration')
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
	margin: 8px auto 10px;
}

.auth-form-error {
	margin: auto;
	max-width: 258.25px;
	text-align: center;
}
</style>
