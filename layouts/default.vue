<template>
  <div>
    <UHorizontalNavigation
      v-if="isDesktop"
      :links="links"
      class="border-b border-gray-200 px-2 dark:border-gray-800 whitespace-nowrap flex-wrap"
    >
      <template #default="{ link }">
        <div class="group-hover:text-primary relative flex flex-1 dark:text-white">
          <div class="flex items-center">
            <div v-if="!link.dropdown">{{ link.label }}</div>
            <div v-else>
              <USelect
                v-model="currentLanguage"
                :options="optionsLang"
                icon="i-heroicons-language-16-solid"
                variant="none"
              />
            </div>
          </div>
        </div>
      </template>
    </UHorizontalNavigation>

    <UVerticalNavigation
      v-else
      :links="links"
      :ui="{ label: 'hidden' }"
      class="px-2 pt-2"
    >
      <template #default="{ link }">
        <div class="group-hover:text-primary relative flex flex-1 dark:text-white">
          <div class="flex items-center">
            <div v-if="!link.dropdown">{{ link.label }}</div>
            <div v-else>
              <USelect
                v-model="currentLanguage"
                :options="optionsLang"
                icon="i-heroicons-language-16-solid"
                variant="none"
              />
            </div>
          </div>
        </div>
      </template>
    </UVerticalNavigation>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { useScreenSize } from '@/composables/useScreenSize';
import { useTokenStore } from '@/store/token.store';
import { useUserStore } from '@/store/user.store';
import { optionsLang } from '@/values/language';

const { setLocale } = useI18n();
const { isDesktop } = useScreenSize();
const tokenStore = useTokenStore();
const userStore = useUserStore();
const router = useRouter();

const user = computed(() => userStore.getUserInfo);

const currentLanguage = ref('');
onMounted(() => {
  if (import.meta.client) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage.value = savedLanguage;
    setLocale(savedLanguage);
  }
});

watch(currentLanguage, (newLang) => {
  localStorage.setItem('language', newLang);
  setLocale(newLang);
});

const logoutUser = (): void => {
  tokenStore.removeToken();
};

const namePathRoute = computed(() => router.currentRoute.value.name);

const logInOrRegistration = computed(() => {
  return namePathRoute.value === 'auth-registration'
    ? [
      {
        label: 'Registration',
        icon: 'i-heroicons-user-plus-20-solid',
        to: '/auth/registration',
      },
    ]
    : [
      {
        label: 'LogIn',
        icon: 'i-heroicons-finger-print-20-solid',
        to: '/auth/login',
      },
    ];
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
  dropdown?: boolean;
}

const baseLinks: Link[][] = [
  [],
  [
    {
      label: 'Language',
      dropdown: true,
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
        label: user.value.username || 'User',
        badge: '100',
        avatar: user.value.avatar
          ? { src: user.value.avatar }
          : undefined,
        icon: user.value.avatar
          ? undefined
          : 'i-heroicons-user',
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
    ]
    : [...logInOrRegistration.value],
);

const links = computed<Link[][]>(() => [[...authLinks.value], [...baseLinks[1]]]);
</script>

<style lang="scss" scoped>
::v-deep select {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border-radius: 16px;
}

::v-deep option {
  background-color: #121212;
}
</style>
