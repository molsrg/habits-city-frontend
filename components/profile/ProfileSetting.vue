<template>
	<div class="profile-setting">
		<div class="profile-settings-container">
			<div class="profile-settings-detail">
				<div class="profile-settings-detail--change">
					<span>Username</span>
					<UButton
						@click="toggleDisabled('username')"
						variant="ghost"
						:icon="
							isDisabled.username
								? 'i-heroicons-lock-closed'
								: 'i-heroicons-lock-open'
						"
						size="2xs"
					/>
				</div>
				<InputText
					type="text"
					class="phone-number"
					:disabled="isDisabled.username"
					v-model="userInfo.username"
				/>
				<AlertApp :label="'username уже занят !'" v-if="isInvalidUsername" />
				<AlertApp
					:label="'username не может быть пустым !'"
					v-if="isInvalidUsernameLength"
				/>
			</div>

			<div class="profile-settings-detail">
				<div class="profile-settings-detail--change">
					<span>Email</span>
					<UButton
						@click="toggleDisabled('email')"
						variant="ghost"
						:icon="
							isDisabled.email
								? 'i-heroicons-lock-closed'
								: 'i-heroicons-lock-open'
						"
						size="2xs"
					/>
				</div>
				<InputText
					type="email"
					class="phone-number"
					:disabled="isDisabled.email"
					v-model="userInfo.email"
				/>
			</div>

			<div class="profile-settings-detail">
				<div class="profile-settings-detail--change">
					<span>Password</span>
					<UButton
						@click="toggleDisabled('password')"
						variant="ghost"
						:icon="
							isDisabled.password
								? 'i-heroicons-lock-closed'
								: 'i-heroicons-lock-open'
						"
						size="2xs"
					/>
				</div>
				<InputText
					:type="isDisabled.password ? 'password' : 'text'"
					class="phone-number"
					:disabled="isDisabled.password"
					v-model="userInfo.password"
				/>
			</div>

			<!-- <div class="profile-setting">
				<h3>{{ $t('page--profile.language') }}</h3>
				<USelect
					icon="i-heroicons-language"
					color="white"
					size="sm"
					:options="['Русский', 'English']"
					placeholder="Search..."
					v-model="languageUser"
				/>
			</div> -->
		</div>
		<UButton
			label="Save data"
			@click="saveDataUser"
			v-if="!isInvalidUsernameLength && !isInvalidUsername"
		/>
	</div>
</template>

<script setup lang="ts">
const router = useRouter()
import { useApiStore } from '@/store/api.store'
import AlertApp from '@/components/alerts/AlertApp'
import { debounce } from 'lodash'
const apiStore = useApiStore()
const { locale, setLocale } = useI18n()
const props = defineProps({
	userInfo: {
		type: Object,
		required: true,
	},
})
const emit = defineEmits(['saveData'])


// Смена возможности изменения полей
const isDisabled = reactive({
	username: true,
	email: true,
	password: true,
})

const toggleDisabled = (field: string) => {
	isDisabled[field] = !isDisabled[field]
}

// Ошибка нового username
const isInvalidUsername = computed(() => {
	return apiStore.getIsValidUsername
})

// Ошибка пустого username
const isInvalidUsernameLength = computed(() => {
	return props.userInfo.username.length == 0
})

// Дебаунс функция для проверки существования username
const debouncedCheckUsername = debounce(async (newUsername, oldUsername) => {
	if (newUsername !== oldUsername) {
		await apiStore.existUsername(newUsername, oldUsername)
	}
}, 300)

watch(
	() => props.userInfo.username,
	(newUsername, oldUsername) => {
		debouncedCheckUsername(newUsername, oldUsername)
	}
)



// Сейвим новые значения 
const saveDataUser = () => {
	emit('saveData')
	isDisabled.userName = true
	isDisabled.email = true
	isDisabled.password = true
}


// Настройки языка
const languageUser = ref('English')
const languageMap = {
	English: 'en',
	Русский: 'ru',
}
watch(languageUser, (newValue, oldValue) => {
	if (oldValue !== newValue) {
		const newLocale = languageMap[newValue]
		setLocale(newLocale)
	}
})



// Запретить переход если есть ошибка
router.beforeEach((to, from, next) => {
	if (!isInvalidUsername.value && !isInvalidUsernameLength.value) {
		next()
	} else {
		next(false)
	}
})

</script>

<style scoped>
.profile-setting {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-size: 18px;
	padding: 15px;
}
.profile-settings-container {
	display: flex;
	justify-content: center;
	align-items: start;
	row-gap: 10px;
	column-gap: 30px;
	flex-wrap: wrap;
}

.profile-settings-detail {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	column-gap: 10px;
	row-gap: 5px;
}

.profile-settings-detail--change {
	display: flex;
	align-items: center;
	column-gap: 10px;
}
</style>
