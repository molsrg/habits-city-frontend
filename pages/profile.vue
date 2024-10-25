<template>
  <div class="profile">
    <div class="profile__title">
      <h1>{{ $t('page--profile.title') }}</h1>
      <h2 class="profile__subtitle">{{ $t('page--profile.subtitle') }}</h2>
    </div>
    <UDivider />
    <div class="profile__nav">
      <UVerticalNavigation
        :links="formattedLinks"
        :ui="{
          wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
          base: 'group block border-s -ms-px leading-6 before:hidden',
          padding: 'p-1 ps-4',
          rounded: '',
          font: 'text-lg',
          ring: '',
          active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
          inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
        }"
        style="height: fit-content"
      />
      <div class="profile__options">
        <div class="profile__options-header">
          <UIcon :name="activeIcon" />
          <h2>{{ activeLabel }}</h2>
        </div>

        <ProfileSetting
          v-if="activeLink === 'Settings'"
          :user-info="userInfo"
          @save:data="saveUserData"
          @new:avatar="uploadNewAvatar"
        />
        <GitHubActivity v-if="activeLink === 'Stats'" />

        <UButton
          v-if="activeLink === 'Settings'"
          :label="$t('page--profile.delete-account')"
          class="profile__delete-button"
          color="red"
          icon="i-heroicons-trash"
          variant="outline"
          @click="appStore.toggleIsDeleteAccount"
        />
      </div>
    </div>

    <DeleteAccount :username="userInfo.username" />
  </div>
</template>

<script lang="ts" setup>
import GitHubActivity from '@/components/charts/GitHubActivity.vue';
import DeleteAccount from '@/components/modal/DeleteAccount.vue';
import { useAppStore } from '@/store/app.store';
import { useUserStore } from '@/store/user.store';

const { setLocale, t } = useI18n();
const appStore = useAppStore();
const userStore = useUserStore();
const toast = useToast();

definePageMeta({ middleware: ['auth'] });
useHead({ title: 'HS | Profile' });

const userInfo = computed(() => ({
  username: userStore.getUserInfo.username,
  email: userStore.getUserInfo.email,
  avatar: userStore.getUserInfo.avatar,
}));

const activeLink = ref('Settings');

const changeLink = (link: string) => {
  activeLink.value = link;
};

const links = [
  // { label: t('page--profile.nav.public-info'), click: () => changeLink('Public info') },
  { label: t('page--profile.nav.settings'), click: () => changeLink('Settings') },
  { label: t('page--profile.nav.stats'), click: () => changeLink('Stats') },
];

const formattedLinks = computed(() =>
  links.map(link => ({
    ...link,
    active: activeLink.value === link.label,
  })),
);

const activeIcon = computed(() => {
  switch (activeLink.value) {
    case 'Settings':
      return 'i-heroicons-cog-6-tooth';
    case 'Stats':
      return 'i-heroicons-chart-bar';
    default:
      return 'i-heroicons-user-circle';
  }
});

const activeLabel = computed(() => activeLink.value);

const saveUserData = async (payload): Promise<void> => {
  const res = await userStore.changeUserInfo(payload);
  const notification = res
    ? { color: 'green', title: t('notifications.save-access') }
    : { color: 'red', title: t('notifications.save-error') };

  toast.add({ ...notification, timeout: 2000 });
};

const uploadNewAvatar = async (payload): Promise<void> => {
  const res = await userStore.uploadNewAvatar(payload);
  const notification = res
    ? { color: 'green', title: t('notifications.save-access') }
    : { color: 'red', title: t('notifications.save-error') };


  toast.add({ ...notification, timeout: 2000 });
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  padding: 5px;

  &__title {
    align-self: flex-start;
    width: 100%;
    font-size: 22px;
  }

  &__subtitle {
    font-size: 16px;
    color: #b0b1b1;
  }

  &__nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__options {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;

    &-header {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  &__delete-button {

    margin: auto;
  }
}
</style>
