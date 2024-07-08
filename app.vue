<template>
	<div>
		<NuxtLayout>
			<NuxtPage class="container" />
		</NuxtLayout>
		<UNotifications />
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'

import { useAuthStore } from '@/store/auth.store'
import { useAppStore } from '@/store/app.store'

const authStore = useAuthStore()
const route = useRoute()
onMounted(async () => {
	await authStore.checkLogin()
})

const title = computed(() => {
	return route.name.charAt(0).toUpperCase() + route.name.slice(1)
})

watch(
	() => route.name,
	() => {
		useSeoMeta({
			title: title.value,
		})
	}
)



// Отслеживание перезагрузки страницы
if (import.meta.env.CLIENT) {
	window.addEventListener('beforeunload', () => {
		const appStore = useAppStore()
		appStore.reload()
	})
}
</script>

<style>
.container {
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 90%;
	margin-top: 2vh;
}
</style>
