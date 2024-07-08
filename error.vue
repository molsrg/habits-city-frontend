<template>
	<div class="error-page">
		<!-- <h1>Error {{ error.statusCode }}</h1> -->
		<span>
			{{ error.message }}
		</span>
		<img :src="`https://http.cat/${error.statusCode}.jpg`" alt="Error" />
		<UButton @click="handleError" color="white" variant="solid"
			>Go back home
		</UButton>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
	error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	min-height: 100vh;
	row-gap: 10px;
	background-color: #121212;
}

h1 {
	font-size: 2.5em;
	font-weight: 700;
	color: white;
}

span {
	font-size: 1.5em;
	color: white;
}
</style>
