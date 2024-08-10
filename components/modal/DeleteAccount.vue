<template>
	<UModal v-model="appStore.isDeleteAccount" prevent-close>
		<UCard
			:ui="{
				ring: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
			}"
		>
			<template #header>
				<div class="flex items-start justify-between">
					<div class="flex items-start justify-between flex-col">
						<h3
							class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
						>
							Delete Account
						</h3>
						<p class="text-sm text-gray-500 mb-4">
							To delete your account, please enter your username below.
						</p>
					</div>

					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="appStore.toggleIsDeleteAccount"
					/>
				</div>
			</template>

			<div class="delete-form">
				<InputText
					type="text"
					class="phone-number"
					placeholder="Input your username"
					v-model="deleteUsernameInput"
				/>
				<UButton
					label="Delete Account"
					color="red"
					variant="solid"
					:disabled="deleteUsernameInput !== props.username"
					@click="deleteAccount"
				/>
			</div>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app.store'
import { useUserStore } from '@/store/user.store'
const appStore = useAppStore()
const userStore = useUserStore()

const props = defineProps({
	username: {
		type: String,
		required: true,
	},
})
const deleteUsernameInput = ref('')

const deleteAccount = () => {
	userStore.deleteAccount(deleteUsernameInput.value)
	deleteUsernameInput.value = ''
	appStore.toggleIsDeleteAccount()
}
</script>

<style scoped>
.delete-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 10px;
}
</style>
