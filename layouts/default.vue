<template>
  <div>
    <UHorizontalNavigation
      v-if="isDesktop"
      :links="links"
      class="border-b border-gray-200 px-2 dark:border-gray-800"
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
        <div class="group-hover:text-primary relative flex flex-1 dark:text-white">
          <div class="flex items-center">
            <div>{{ link.label }}</div>
          </div>
        </div>
      </template>
    </UVerticalNavigation>
    <slot />
  </div>
</template>

<script lang="ts" setup>
// Проверка на ширину экрана
import { useScreenSize } from '@/composables/useScreenSize';
import { useAuthStore } from '../store/auth.store';
import { useTokenStore } from '../store/token.store';

const { isDesktop } = useScreenSize();

const tokenStore = useTokenStore();
const authStore = useAuthStore();
const router = useRouter();

// Выход из системы
const logoutUser = (): void => {
  tokenStore.removeToken();
  console.log('Logout user');
};

const namePathRoute = computed(() => {
  return router.currentRoute.value.name;
});

const logInOrRegistration = computed(() => {
  if (namePathRoute.value === 'auth-registration') {
    return [
      {
        label: 'Registration',
        icon: 'i-heroicons-user-plus-20-solid',
        to: '/auth/registration',
      },
    ];
  } else {
    return [
      {
        label: 'LogIn',
        icon: 'i-heroicons-finger-print-20-solid',
        to: '/auth/login',
      },
    ];
  }
});

interface Link {
  label: string;
  icon?: string;
  avatar?: {
    src: string;
  };
  badge?: number;
  to?: string;
  click?: () => void;
}

const baseLinks: Link[][] = [
  [],
  [
    {
      label: 'Store',
      icon: 'i-heroicons-shopping-bag',
      to: '/questions',
    },
    {
      label: 'Home Page',
      icon: 'i-heroicons-home',
      to: '/',
    },
  ],
];

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
        {
          icon: 'i-heroicons-calendar-days',
          label: 'Calendar',
          to: '/calendar',
        },
      ]
    : [...logInOrRegistration.value],
);

const links = computed<Link[][]>(() => {
  return [[...authLinks.value], [...baseLinks[1]]];
});
</script>
