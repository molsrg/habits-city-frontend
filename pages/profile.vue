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

		<div class="profile-setting">
			<h3>{{ $t('page--profile.language') }}</h3>
			<USelect
				icon="i-heroicons-language"
				color="white"
				size="sm"
				:options="['Русский', 'English']"
				placeholder="Search..."
				v-model="languageUser"
			/>
		</div>
		<VerificatedPhone />
	</div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
import { watch } from 'vue'
import VerificatedPhone from '../components/modal/VerificatedPhone.vue'
definePageMeta({
	middleware: ['auth'],
})
useHead({
	title: 'HS | Profile',
})

const languageUser = ref('English')

const languageMap = {
	'English': 'en',
	'Русский': 'ru'
}

watch(languageUser, (newValue, oldValue) => {
	if (oldValue !== newValue) {
		const newLocale = languageMap[newValue]
		setLocale(newLocale)
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

.profile-setting {
	display: flex;
	align-self: flex-start;
	column-gap: 20px;

	font-size: 18px;
	padding: 15px;
}
</style>
