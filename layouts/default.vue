<template>
	<div>
	<UHorizontalNavigation
			:links="links"
			v-if="isDesktop"
			class="border-b border-gray-200 dark:border-gray-800 px-2"
		/>

		<UVerticalNavigation
			v-else
			:links="links"
			:ui="{
				label: 'hidden',
			}"
			class="px-2 pt-2"
		>
			<template #default="{ link }">
				<div
					class="flex-1 flex relative dark:text-white group-hover:text-primary"
				>
					<div class="flex items-center">
						<div>{{ link.label }}</div>
					</div>
				</div>
			</template>
		</UVerticalNavigation>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Проверка на ширину экрана
import { useScreenSize } from '@/composables/useScreenSize'
const { isDesktop } = useScreenSize()

import { useAuthStore } from '../store/auth.store'
const authStore = useAuthStore()
import { useTokenStore } from '../store/token.store'
const tokenStore = useTokenStore()

// Выход из системы
const logoutUser = (): void => {
	tokenStore.removeToken()
	console.log('Logout user')
}

const router = useRouter()

const namePathRoute = computed(() => {
	return router.currentRoute.value.name
})

const logInOrRegistration = computed(() => {
	if (namePathRoute.value === 'auth-registration') {
		return [
			{
				label: 'Registration',
				icon: 'i-heroicons-user-plus-20-solid',
				to: '/auth/registration',
			},
		]
	} else {
		return [
			{
				label: 'LogIn',
				icon: 'i-heroicons-finger-print-20-solid',
				to: '/auth/login',
			},
		]
	}
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

const baseLinks: Link[][] = [
	[],
	[
		{
			label: 'F.A.Q.',
			icon: 'i-heroicons-question-mark-circle-20-solid',
			to: '/questions',
		},
		{
			label: 'Home Page',
			icon: 'i-heroicons-home-20-solid',
			to: '/',
		},
	],
]

const authLinks = computed(() =>
	tokenStore.getStatus
		? [
				{
					icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
					label: 'Log Out',
					badge: '',
					click: logoutUser,
				},
				{
					icon: 'i-heroicons-user',
					label: 'Profile',
					badge: '100',
					to: '/profile',
				},
				{
					icon: 'i-heroicons-user-group',
					label: 'Friends',
					badge: '0',
					to: '/friends',
				},
				{
					icon: 'i-heroicons-circle-stack',
					label: 'Tasks',
					to: '/tasks',
				},
		  ]
		: [...logInOrRegistration.value]
)

const links = computed<Link[][]>(() => {
	return [[...authLinks.value], [...baseLinks[1]]]
})
</script>
