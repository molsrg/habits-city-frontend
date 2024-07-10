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



// Выход из системы
const logoutUser = (): void => {
	console.log('logout user')
}




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
			to: '/faq',
		},
		{
			label: 'Home Page',
			icon: 'i-heroicons-home-20-solid',
			to: '/',
		},
	],
]

const isUserAuthorized = ref<boolean>(false)

const authLinks = computed(() =>
	isUserAuthorized.value
		? [
				{
					icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
					label: 'Log Out',
					badge: '',
					click: logoutUser,
				},
		  ]
		: [
				{
					label: 'Login ',
					icon: 'i-heroicons-finger-print-20-solid',
					to: '/login',
				},
		  ]
)

const links = computed<Link[][]>(() => {
	return [[...authLinks.value], [...baseLinks[1]]]
})
</script>
