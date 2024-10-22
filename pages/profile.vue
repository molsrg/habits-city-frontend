<template>
  <div class="profile">
    <div class="profile-title">
      <h1>{{ $t('page--profile.title') }}</h1>
      <h2 class="profile-subtitle">
        {{ $t('page--profile.subtitle') }}
      </h2>
    </div>
    <UDivider />

    <div class="profile-options">
      <UIcon name="i-heroicons-cog-6-tooth-20-solid" />
      <h2>{{ $t('page--profile.settings') }}</h2>
    </div>
    <ProfileSetting :user-info="userInfo" @save-data="saveUserData" />
    <div class="profile-options">
      <UIcon name="i-heroicons-language" />
      <h2>{{ $t('page--profile.language') }}</h2>
    </div>

    <div class="radio-button">
      <InputRadioButton
        v-for="options in optionsLang"
        :key="options.value"
        :select-options="options"
        :select-value="currentLanguage"
        @update:select-value="handleSelectValue"
      />
    </div>
    <!--		<div class="profile-options">-->
    <!--			<UIcon name="i-heroicons-chart-pie" />-->
    <!--			<h2>Statistic</h2>-->
    <!--		</div>-->
    <!--		<ChartApp />-->

    <UButton
      class="delete-button"
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

const { locale, setLocale } = useI18n();
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
const optionsLang = [
  { inputId: 'lang1', value: 'ru', label: 'Русский' },
  { inputId: 'lang2', value: 'en', label: 'English' },
  { inputId: 'lang3', value: 'fr', label: 'France' },
];
const handleSelectValue = (value: string) => {
  currentLanguage.value = value;
  setLocale(value);
};

const userInfo = reactive({
  username: userStore.getUserInfo.username,
  email: userStore.getUserInfo.email,
  password: userStore.getUserInfo.password,
});
const saveUserData = () => {
  userStore.changeUserInfo(userInfo);
  toast.add({
    color: 'green',
    title: 'Save data access',
    timeout: 2000,
  });
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  padding: 5px;
}

.profile-title {
  align-self: flex-start;
  width: 100%;
  font-size: 22px;
}

.profile-subtitle {
  font-size: 16px;
  color: #b0b1b1;
}

.profile-options {
  align-self: flex-start;
  display: flex;
  align-items: center;
  column-gap: 8px;

  font-size: 20px;
}

.delete-button {
  margin: 20px;
  /* align-self: flex-end; */
}

.radio-button {
  display: flex;
  column-gap: 30px;
}
</style>
