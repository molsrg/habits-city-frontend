<script lang="ts" setup>
import ChartApp from '@/components/charts/ChartApp.vue';
import ChartProfile from '@/components/charts/ChartProfile.vue';
import GitHubActivity from '@/components/charts/GitHubActivity.vue';
import DeleteAccount from '@/components/modal/DeleteAccount.vue';
import LinkEmail from '@/components/modal/LinkEmail.vue';
import ProfileModal from '@/components/modal/ProfileModal.vue';
import { useScreenSize } from '@/composables/useScreenSize';
import { useNavigationLinks } from '@/configs/profileSettingsLink.ts';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useApiStore } from '@/store/api.store';
import { useFriendStore } from '@/store/friend.store';
import { useUserStore } from '@/store/user.store';
import { debounce } from '@/utils/debounce';

const { isDesktop } = useScreenSize();
const { t } = useI18n();
const userStore = useUserStore();
const friendStore = useFriendStore();
const apiStore = useApiStore();
definePageMeta({ middleware: ['auth'], colorMode: 'dark' });
const title = computed(() => `HS | ${t('nav--layout.friends')}`);
useHead({
  title,
});

// Link navigation
const { formattedLinks, activeLink } = useNavigationLinks();

// Actions
const saveUserData = async (payload): Promise<void> => {
  await userStore.changeUserInfo(payload);
};

const updateUserPassword = async (payload): Promise<void> => {
  await userStore.changeUserPassword(payload);
};

const uploadNewAvatar = async (payload): Promise<void> => {
  await userStore.uploadNewAvatar(payload);
};

const checkUsername = debounce(async (newUsername: string) => {
  await apiStore.existUsername(newUsername);
}, 300);

const linkSocialNetwork = async (payload): Promise<void> => {
  console.log(payload.key);
};

// Open modals
const linkNewEmail = () => {
  modalService.open(ModalName.LinkEmail);
};

const updateEmail = () => {
  modalService.open(ModalName.LinkEmail);
};

const deleteAccount = () => {
  modalService.open(ModalName.DeleteAccount);
};

const openModalProfile = async (username: string): void => {
  const payload = await friendStore.fetchFriendInfo(username);
  modalService.open(ModalName.Profile, payload);
};
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-2 p-1">
      <div class="w-full self-start text-2xl">
        <h1>{{ $t('page--profile.title') }}</h1>
        <h2 class="text-lg text-gray-500">{{ $t('page--profile.subtitle') }}</h2>
      </div>
      <UDivider />
      <div class="flex w-full flex-wrap justify-between gap-5 lg:flex-nowrap">
        <UVerticalNavigation
          v-if="isDesktop"
          :links="formattedLinks"
          :ui="{
            wrapper: 'border-l border-gray-200 dark:border-gray-800 space-y-2',
            base: 'group block border-l -ml-px leading-6 before:hidden',
            padding: 'p-1 pl-4',
            rounded: '',
            font: 'text-lg',
            ring: '',
            active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
            inactive:
              'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
          }"
          class="h-fit"
        />
        <UHorizontalNavigation v-else :links="formattedLinks" class="h-fit" />
        <div class="flex flex-1 flex-col gap-2 overflow-hidden">
          <ProfileSetting
            v-if="activeLink === 'Settings'"
            :user-info="userStore.getUserInfo"
            @update:user-password="updateUserPassword"
            @new:avatar="uploadNewAvatar"
            @update:user-account="saveUserData"
            @link:email="linkNewEmail"
            @update:email="updateEmail"
            @delete:account="deleteAccount"
            @check:username="checkUsername"
            @link:social="linkSocialNetwork"
            @open:profile="openModalProfile"
          />
          <GitHubActivity v-if="activeLink === 'Stats'" />
          <!--          <div v-if="activeLink === 'Stats'" class="flex flex-wrap gap-4 overflow-auto">-->
          <!--            <ChartApp :title="t('modal.delete-friend.profile-stat')" class="flex-1">-->
          <!--              <ChartProfile />-->
          <!--            </ChartApp>-->
          <!--            <ChartApp :title="t('modal.delete-friend.profile-stat')" class="flex-1">-->
          <!--              <ChartProfile />-->
          <!--            </ChartApp>-->
          <!--            <ChartApp :title="t('modal.delete-friend.profile-stat')" class="flex-1">-->
          <!--              <ChartProfile />-->
          <!--            </ChartApp>-->
          <!--          </div>-->
        </div>
      </div>

      <DeleteAccount :username="userStore.getUserInfo.username" />
      <LinkEmail />
      <ProfileModal />
    </div>
  </div>
</template>
