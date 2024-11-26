<template>
  <div>
    <UHorizontalNavigation v-if="isDesktop" :links="links" class="flex-wrap whitespace-nowrap border-b border-gray-200 px-2 dark:border-gray-800">
      <template #default="{ link }">
        <div class="group-hover:text-primary relative flex flex-1 dark:text-white">
          <div class="flex items-center">
            <div v-if="!link.dropdown">{{ link.label }}</div>
            <div v-else>
              <USelect v-model="currentLanguage" :options="optionsLang" icon="i-heroicons-language-16-solid" variant="none" />
            </div>
          </div>
        </div>
      </template>
    </UHorizontalNavigation>

    <UVerticalNavigation v-else :links="links" :ui="{ label: 'hidden' }" class="px-2 pt-2">
      <template #default="{ link }">
        <div class="group-hover:text-primary relative flex flex-1 dark:text-white">
          <div class="flex items-center">
            <div v-if="!link.dropdown">{{ link.label }}</div>
            <div v-else>
              <USelect v-model="currentLanguage" :options="optionsLang" icon="i-heroicons-language-16-solid" variant="none" />
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
import { optionsLang } from '@/constants/languageOptions';
import { useLocaleStore } from '@/store/locale.store';
import { useTokenStore } from '@/store/token.store';
import { useUserStore } from '@/store/user.store';

const { t, setLocale } = useI18n();

const { isDesktop } = useScreenSize();
const tokenStore = useTokenStore();
const userStore = useUserStore();
const localeStore = useLocaleStore();
const router = useRouter();

const user = computed(() => userStore.getUserInfo);

const currentLanguage = ref('');
onMounted(() => {
  if (import.meta.client) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage.value = savedLanguage;
    localeStore.setLocale(savedLanguage);
    setLocale(savedLanguage);
  }
});

watch(currentLanguage, (newLang) => {
  localStorage.setItem('language', newLang);
  localeStore.setLocale(newLang);
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
        label: t('nav--layout.registration'),
        icon: 'i-heroicons-user-plus-20-solid',
        to: '/auth/registration',
      },
    ]
    : [
      {
        label: t('nav--layout.login'),
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

const baseLinks = computed<Link[][]>(() => [
  [],
  [
    {
      label: 'Language',
      dropdown: true,
    },
    {
      label: t('nav--layout.home-page'),
      icon: 'i-heroicons-home',
      to: '/',
    },
  ],
]);

const authLinks = computed(() =>
  tokenStore.getStatus
    ? [
      {
        icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
        label: t('nav--layout.logout'),
        badge: '',
        click: logoutUser,
      },
      {
        label: user.value.username || 'User',
        badge: user.value.rating || undefined,
        avatar: user.value.avatar ? { src: user.value.avatar } : undefined,
        icon: user.value.avatar ? undefined : 'i-heroicons-user',
        to: '/profile',
      },
      {
        icon: 'i-heroicons-user-group',
        label: t('nav--layout.friends'),
        badge: '0',
        to: '/friends',
      },
      {
        icon: 'i-heroicons-circle-stack',
        label: t('nav--layout.tasks'),
        to: '/tasks',
      },
      {
        icon: 'i-heroicons-currency-dollar',
        label: t('nav--layout.balance'),
        badge: user.value.rating || undefined,
        to: '/balance',
      },
    ]
    : [...logInOrRegistration.value],
);

const links = computed<Link[][]>(() => [[...authLinks.value], [...baseLinks.value[1]]]);
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
