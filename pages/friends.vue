<script lang="ts" setup>
import ProfileModal from '@/components/modal/ProfileModal.vue';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useFriendStore } from '@/store/friend.store';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'HS | Friends',
});

const friendStore = useFriendStore();
const searchFriend = ref('');
const { t } = useI18n();

const addNewPeople = (username: string): void => {
  friendStore.addNewFriend(username);
};

const openModalProfile = async (username: string): void => {
  const payload = await friendStore.fetchFriendInfo(username);
  modalService.open(ModalName.Profile, payload);
};

let debounceTimeout: ReturnType<typeof setTimeout>;
watch(searchFriend, (newValue) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    friendStore.fetchSuggestedFriends(newValue.trim());
  }, 300);
});
</script>

<template>
  <div class="friends">
    <UInput
      v-model="searchFriend"
      :placeholder="t('page--friends.placeholder')"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      autocomplete="off"
      class="friends__search"
      icon="i-heroicons-magnifying-glass-20-solid"
      name="search-friend"
      size="xl"
    >
      <template #trailing>
        <UButton
          v-show="searchFriend !== ''"
          :padded="false"
          color="gray"
          icon="i-heroicons-x-mark-20-solid"
          variant="link"
          @click="searchFriend = ''"
        />
      </template>
    </UInput>

    <div class="friends__container">
      <CardsProfile
        v-for="user in friendStore.getSuggestedFriends"
        :key="user.username"
        :people-info="user"
        @open:profile="openModalProfile"
        @add:people="addNewPeople"
      />
      <div v-if="friendStore.getSuggestedFriends.length === 0">
        <h3>{{ t('page--friends.not-found') }}</h3>
      </div>
    </div>
  </div>

  <ProfileModal />
</template>

<style lang="scss" scoped>
.friends {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  &__search {
    width: 60vw;
  }

  &__container {
    margin-top: 2vh;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
