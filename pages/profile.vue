<script lang="ts" setup>
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
definePageMeta({ middleware: ['auth'] });
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
    <div class="profile">
      <div class="profile__title">
        <h1>{{ $t('page--profile.title') }}</h1>
        <h2 class="profile__subtitle">{{ $t('page--profile.subtitle') }}</h2>
      </div>
      <UDivider />
      <div class="profile__nav">
        <UVerticalNavigation
          v-if="isDesktop"
          :links="formattedLinks"
          :ui="{
            wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
            base: 'group block border-s -ms-px leading-6 before:hidden',
            padding: 'p-1 ps-4',
            rounded: '',
            font: 'text-lg',
            ring: '',
            active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
            inactive:
              'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
          }"
          style="height: fit-content"
        />
        <UHorizontalNavigation v-else :links="formattedLinks" style="height: fit-content" />
        <div class="profile__options">
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
        </div>
      </div>

      <DeleteAccount :username="userStore.getUserInfo.username" />
      <LinkEmail />
      <ProfileModal />
    </div>
  </div>
</template>

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

    @media (max-width: 600px) {
      flex-direction: column;
    }
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
