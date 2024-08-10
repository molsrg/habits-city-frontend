<template>
	<div class="profile">
		<div class="profile-title">
			<h1>{{ $t('page--profile.title') }}</h1>
			<h2 class="profile-subtitle">
				{{ $t('page--profile.subtitle') }}
			</h2>
		</div>
		<UDivider />
		<div class="profile-options">
			<UIcon name="i-heroicons-cog-6-tooth-20-solid" />
			<h2>{{ $t('page--profile.settings') }}</h2>
		</div>
		<ProfileSetting :user-info="userInfo" @save-data="saveUserData" />
		<div class="profile-options">
			<UIcon name="i-heroicons-language" />
			<h2>{{ $t('page--profile.language') }}</h2>
		</div>

		<div class="flex flex-wrap gap-12">
			<div
				v-for="option in optionsLang"
				:key="option.value"
				class="flex align-items-center"
			>
				<RadioButton
					v-model="selectedLanguage"
					:inputId="option.inputId"
					name="pizza"
					:value="option.value"
					variant='filled'
				/>
				<label :for="option.inputId" class="ml-2">{{ option.label }}</label>
			</div>
		</div>
		<UButton
				class="delete-button"
				@click="appStore.toggleIsDeleteAccount"
				icon="i-heroicons-trash"
				color="red"
				variant="outline"
				label="Удалить аккаунт"
			/>
		<!-- <VerificatedPhone /> -->
		<DeleteAccount :username="userInfo.username" />

	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.store'
import { useAppStore } from '@/store/app.store'
import DeleteAccount from '@/components/modal/DeleteAccount.vue'

const { locale, setLocale } = useI18n()
const appStore = useAppStore()
const userStore = useUserStore()
const toast = useToast()
// import ProfileSetting from '../components/profile/ProfileSetting.vue'
// import VerificatedPhone from '../components/modal/VerificatedPhone.vue'
definePageMeta({
	middleware: ['auth'],
})
useHead({
	title: 'HS | Profile',
})

const selectedLanguage = ref('en')
const optionsLang = [
	{ inputId: 'lang1', value: 'ru', label: 'Русский' },
	{ inputId: 'lang2', value: 'en', label: 'English' },
	{ inputId: 'lang3', value: 'fr', label: 'France' },
]

const userInfo = reactive({
	username: 'john_doe',
	email: 'doe@example.com',
	password: 'passwosdsadrd123',
})
const saveUserData = () => {
	userStore.changeUserInfo(userInfo)
	toast.add({
		color: 'green',
		title: 'Save data access',
		timeout: 2000,
	})
}

// Настройки языка
watch(selectedLanguage, (newValue, oldValue) => {
	if (oldValue !== newValue) {
		setLocale(newValue)
	}
})
</script>

<style scoped>
.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 10px;
	padding: 5px;
}

.profile-title {
	align-self: flex-start;
	width: 100%;
	font-size: 22px;
}

.profile-subtitle {
	font-size: 16px;
	color: #b0b1b1;
}

.profile-options {
	align-self: flex-start;
	display: flex;
	align-items: center;
	column-gap: 8px;

	font-size: 20px;
}

.delete-button {
	margin: 20px;
	/* align-self: flex-end; */
}


</style>
