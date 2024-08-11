<template>
	<div class="profile-setting">
		<div class="profile-settings-container">
			<div class="profile-settings-detail">
				<div class="profile-settings-detail--change">
					<span>{{ $t('page--profile.settings-option.username') }}</span>
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

				<Transition>
					<AlertApp :label="'username уже занят !'" v-if="isInvalidUsername" />
				</Transition>
				<Transition>
					<AlertApp
						:label="'username не может быть пустым !'"
						v-if="isInvalidUsernameLength"
					/>
				</Transition>
			</div>
			<div class="profile-settings-detail">
				<div class="profile-settings-detail--change">
					<span>{{ $t('page--profile.settings-option.email') }}</span>
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
					<span>{{ $t('page--profile.settings-option.password') }}</span>
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
		</div>
		<UButton
			:class="buttonHidden"
			:label="$t('page--profile.save-data')"
			@click="saveDataUser"
		/>
	</div>
</template>

<script setup lang="ts">
import AlertApp from '@/components/alerts/AlertApp'
import { useApiStore } from '@/store/api.store'
import { debounce } from 'lodash'

const apiStore = useApiStore()
const router = useRouter()

const props = defineProps({
	userInfo: {
		type: Object,
		required: true,
	},
})
const emit = defineEmits(['saveData'])

// Исходные данные пользователя
const originalUserInfo = ref({ ...props.userInfo })

// Вычисляемое свойство для отслеживания изменений данных пользователя
const hasChanges = computed(() => {
	return (
		JSON.stringify(props.userInfo) !== JSON.stringify(originalUserInfo.value)
	)
})

const buttonHidden = computed(() => {
	return {
		'save-button': true,
		'save-button--visible':
			!isInvalidUsernameLength.value &&
			!isInvalidUsername.value &&
			hasChanges.value,
	}
})

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
	isDisabled.username = true
	isDisabled.email = true
	isDisabled.password = true

	originalUserInfo.value = { ...props.userInfo }
}

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

.save-button {
	opacity: 0;
	transition: all 0.5s ease-in-out; /* Плавная анимация для opacity */
}

.save-button--visible {
	opacity: 1;
	transform: translateY(-10px);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
