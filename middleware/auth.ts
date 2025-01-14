import { useTokenStore } from '@/store/token.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStore = useTokenStore();
  if (!tokenStore.getStatus) {
    return navigateTo('/auth/login');
  }
});
