<template>
	<div >
		<div class="pending" v-if='accessToken'>
			<h3 class="text-xl">Wait for the authorization!</h3>

			<span class="loader"></span>
		</div>
		<div class="pending-error" v-else>
			<h3 class="text-xl">Sorry...your oAuth is invalid!</h3>
			<UButton @click="handleError" color="white" variant="solid"
			>Go back login
		</UButton>
		</div>
	</div>
</template>
<script setup lang="ts">import { useTokenStore } from '@/store/token.store';



const tokenStore = useTokenStore();
const route = useRoute();
const router = useRouter();
let accessToken = 'some';

// Google
const tokenGoogle = route.query.code
if(tokenGoogle) {
	accessToken = tokenGoogle

}

// Yandex
const tokenYandex = new URLSearchParams(route.hash.substring(1));
const accessTokenYandex = tokenYandex.get('access_token');

if (accessTokenYandex) {
  accessToken = accessTokenYandex;
}

if (process.client && accessToken.length > 5) {
  sessionStorage.setItem('AccessToken', accessToken);
  tokenStore.setToken(accessToken);
  router.push('/profile');
}

import type { NuxtError } from '#app'

const props = defineProps({
	error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/auth/login' })
</script>
<style scoped>
.pending {
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 40px;
	padding: 20px;
}

.pending-error {
	display: flex;
	flex-direction: column;
	align-items: center ;
	row-gap: 10px;
	padding: 20px;
}

.loader {
	width: 68px;
	height: 68px;
	border: 5px solid #fff;
	border-bottom-color: #4ade80;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 2s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
