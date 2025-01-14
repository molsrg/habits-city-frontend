import { useBalanceStore } from '@/store/balance.store';
import { useFriendStore } from '@/store/friend.store';
import { useUserStore } from '@/store/user.store';

export default defineNuxtPlugin((nuxtApp) => {
  const isLoadingPage = useState('isLoadingPage', () => false);

  nuxtApp.$router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const friendStore = useFriendStore();
    const balanceStore = useBalanceStore();

    isLoadingPage.value = false;
    
    if (['/profile', '/friends', '/balance'].includes(to.path)) {
      isLoadingPage.value = true;

      if (to.path === '/profile') {
        await userStore.fetchUserInfo();
      }

      if (to.path === '/friends') {
        await friendStore.fetchFriends();
      }

      if (to.path === '/balance') {
        await balanceStore.fetchBalanceUser();
      }
    }

    next();
  });

  nuxtApp.$router.afterEach(() => {
    isLoadingPage.value = false;
  });
});
