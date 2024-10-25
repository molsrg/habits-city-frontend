import { useTokenStore } from '@/store/token.store';
import { useUserStore } from '@/store/user.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();

  if (!tokenStore.getStatus) {
    return navigateTo('/auth/login');
  }

  if (to.path === '/profile') {
    await userStore.fetchUserInfo();
  }
});
