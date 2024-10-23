<template>
  <div class="profile">
    <div class="profile__title">
      <h1>{{ $t('page--profile.title') }}</h1>
      <h2 class="profile__subtitle">
        {{ $t('page--profile.subtitle') }}
      </h2>
    </div>
    <UDivider />

    <div class="profile__options">
      <UIcon name="i-heroicons-cog-6-tooth-20-solid" />
      <h2>{{ $t('page--profile.settings') }}</h2>
    </div>
    <ProfileSetting :user-info="userInfo" @save:data="saveUserData" />
    
    <!--		<div class="profile-options">-->
    <!--			<UIcon name="i-heroicons-chart-pie" />-->
    <!--			<h2>Statistic</h2>-->
    <!--		</div>-->
    <!--		<ChartApp />-->

    <UButton
      class="profile__delete-button"
      color="red"
      icon="i-heroicons-trash"
      label="Удалить аккаунт"
      variant="outline"
      @click="appStore.toggleIsDeleteAccount"
    />
    <!-- <VerificatedPhone /> -->
    <DeleteAccount :username="userInfo.username" />
  </div>
</template>

<script lang="ts" setup>
import DeleteAccount from '@/components/modal/DeleteAccount.vue';
import { useAppStore } from '@/store/app.store';
import { useUserStore } from '@/store/user.store';
import { optionsLang } from '@/values/language';

const { setLocale, t } = useI18n();
const appStore = useAppStore();
const userStore = useUserStore();
userStore.fetchUserInfo();

const toast = useToast();

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'HS | Profile',
});

const currentLanguage = ref('en');
const handleSelectValue = (value: string) => {
  currentLanguage.value = value;
  setLocale(value);
};

const userInfo = reactive({
  username: userStore.getUserInfo.username,
  email: userStore.getUserInfo.email,
  password: userStore.getUserInfo.password,
});

const saveUserData = async (): Promise<void> => {
  const res = await userStore.changeUserInfo(userInfo);
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

  &__options {
    align-self: flex-start;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 20px;
  }

  &__delete-button {
    margin: 20px;
  }

  &__radio-buttons {
    display: flex;
    column-gap: 30px;
  }
}
</style>
