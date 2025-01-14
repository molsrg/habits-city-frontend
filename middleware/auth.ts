import { useTokenStore } from '@/store/token.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStore = useTokenStore();
  console.log(tokenStore.getToken);
  console.log(tokenStore.getStatus);
  // if (!tokenStore.getStatus) {
  //   return navigateTo('/auth/login');
  // }
});
