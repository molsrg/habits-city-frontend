import { useBalanceStore } from '@/store/balance.store';
import { useFriendStore } from '@/store/friend.store';
import { useTokenStore } from '@/store/token.store';
import { useUserStore } from '@/store/user.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStore = useTokenStore();
  const userStore = useUserStore();
  const friendStore = useFriendStore();
  const balanceStore = useBalanceStore();
  if (!tokenStore.getStatus) {
    return navigateTo('/auth/login');
  }

  if (to.path === '/profile') {
    await userStore.fetchUserInfo();
  }

  if (to.path === '/friends') {
    await friendStore.fetchFriends();
  }

  if (to.path === '/balance') {
    await balanceStore.fetchBalanceUser();
  }
});
