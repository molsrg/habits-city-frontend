<template>
	<div class="auth">
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
				/>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth.store'
import { useAppStore } from '../store/app.store'
import { ref, watch, computed, reactive } from 'vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const userData = reactive({
	username: '',
	password: '',
})

const logInUser = () => {
	console.log(userData)
}

const pushToRegPage = () => {
	const router = useRouter()
	appStore.sendErrorLogInText('')
	router.push('/auth')
}
</script>

<style scoped>
.auth {
	margin-top: 20vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 15px;
}

.auth-form {
	padding: 20px;
	border-radius: 10px;
	border: 1px solid rgb(var(--color-primary-400));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 8px;
}

.auth-form-subtitle {
	font-size: 12px;
	margin-top: -12px;
	color: rgb(var(--color-gray-400));
}

.auth-form-input {
	display: flex;
	flex-direction: column;

	row-gap: 5px;
	width: 100%;
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
