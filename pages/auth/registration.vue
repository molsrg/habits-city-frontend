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
					class="auth-btn"
					icon="i-heroicons-user-plus-20-solid"
					color="black"
					label="Register"
					@click="registerUser"
					:disabled="!userData.password.length || !userData.username.length"
					:loading="appStore.isLoadingReg"
				/>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth.store'
import { useAppStore } from '../../store/app.store'
import { reactive } from 'vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const userData = reactive({
	username: '',
	password: '',
})

const loadingData = ref(false)

const registerUser = () => {
	authStore.createUser(userData)
	loadingData.value = true
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
	margin: 0 auto;
	margin-top: 6px;
}

.auth-form-error {
	margin: auto;
	max-width: 258.25px;
	text-align: center;
}
</style>
