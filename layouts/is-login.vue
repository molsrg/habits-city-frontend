<template>
	<div>
		<UHorizontalNavigation
			:links="links"
			v-if="isDesktop"
			class="border-b border-gray-200 dark:border-gray-800 px-2"
		/>
		<UVerticalNavigation v-else :links="links" class="px-2 pt-2" />
		<slot />
	</div>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth.store'
import { useUserStore } from '@/store/user.store'
import { useApiStore } from '@/store/api.store'

import { useScreenSize } from '@/composables/useScreenSize'
const { isDesktop } = useScreenSize()

const apiStore = useApiStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const router = useRouter()

const userInfo = computed(() => userStore.getUserInfo)

const logoutUser = (): void => {
	if (
		apiStore.getIsValidUsername ||
		userStore.getUserInfo.username.length == 0
	) {
		return
	}
	authStore.logout()
}

// Смена темы
const colorMode = useColorMode()
const changeTheme = (): void => {
	isDark.value = !isDark.value
}

const isDark = computed({
	get() {
		return colorMode.value === 'dark'
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	},
})

interface Link {
	label: string
	icon?: string
	avatar?: {
		src: string
	}
	badge?: number
	to?: string
	click?: () => void
}

const links = computed<Link[][]>(() => {
	const themeIcon = {
		icon: isDark.value ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid',
		label: '',
		click: changeTheme,
	}

	const baseLinks: Link[][] = [
		[
			{
				label: userInfo.value.name,
				// avatar: {
				// 	src: userInfo.value.avatar.src,
				// },
				badge: userInfo.value.rating,
				to: '/profile',
			},
			{
				icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
				label: 'Выход',
				click: logoutUser,
			},
		],
		[],
	]

	return [[...baseLinks[0]], [themeIcon, ...baseLinks[1]]]
})
</script>
