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

		<!-- <VerificatedPhone /> -->
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.store'

// import ProfileSetting from '../components/profile/ProfileSetting.vue'
// import VerificatedPhone from '../components/modal/VerificatedPhone.vue'
definePageMeta({
	middleware: ['auth'],
})
useHead({
	title: 'HS | Profile',
})
const userStore = useUserStore()
const userInfo = reactive({
	username: 'john_doe',
	email: 'doe@example.com',
	password: 'passwosdsadrd123',
})

const saveUserData = () => {
	userStore.changeUserInfo(userInfo)
}
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
</style>
