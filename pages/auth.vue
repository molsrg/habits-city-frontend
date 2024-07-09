<template>
	<div class="auth">
		<VerificatedPhone />
		<div class="auth-form">
			<h2 class="text-xl" style="margin-right: auto">Registry</h2>
			<span class="text-sm"
				>Enter your credentials to access your account.</span
			>
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
			</div>
			<UButton
				class="mt-2"
				icon="i-heroicons-user-plus-20-solid"
				color="black"
				label="Register"
				@click='registerUser'
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import VerificatedPhone from '../components/modal/VerificatedPhone.vue'
import { useAuthStore } from '../store/auth.store';
import { ref, watch, computed, reactive } from 'vue'

const authStore = useAuthStore()

const userData = reactive({
  username: '',
  password: '',
})



const registerUser = () => {
	authStore.createUser(userData)
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
	row-gap: 5px;
}

.auth-form-input {
	display: flex;
	flex-direction: column;
	row-gap: 5px;
	width: 100%;
}
</style>
