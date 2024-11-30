<script lang="ts" setup>
import ProfileModal from '@/components/modal/ProfileModal.vue';
import SearchFilters from '@/components/search/SearchFilters.vue';
import { useFilterConfig } from '@/configs/filterFriends';
import { FRIENDS_CHUNK } from '@/constants/friends';
import { ModalName } from '@/constants/modalName';
import { modalService } from '@/services/modal.service';
import { useFriendStore } from '@/store/friend.store';
import { debounce } from '@/utils/debounce';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'HS | Friends',
});
const filterConfig = useFilterConfig();
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

const selectedFilter = ref('');
const setFilter = (filter: string) => {
  selectedFilter.value = filter;
};

watch([searchFriend, selectedFilter], ([newSearchValue, newSelectedButton]) => {
  debounce(() => {
    friendStore.fetchFriends({
      ...(searchFriend.value ? { username: newSearchValue } : {}),
      ...(selectedFilter.value ? { status: newSelectedButton } : {}),
    });
  }, 300)();
});

const deleteFriend = async (username: string) => {
  await friendStore.deleteFriend(username);
  modalService.close(ModalName.Profile);
};

const footerRef = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && (friendStore.batchCount + 1) * FRIENDS_CHUNK === friendStore.getSuggestedFriends.length) {
    friendStore.fetchFriendsChunk({
      ...(searchFriend.value && { username: searchFriend.value }),
      ...(selectedFilter.value && { status: selectedFilter.value }),
    });
  }
});

onMounted(() => {
  if (footerRef.value) observer.observe(footerRef.value);
});

onBeforeUnmount(() => {
  if (footerRef.value) observer.unobserve(footerRef.value);
});
</script>

<template>
  <div>
    <div class="mt-[3vh] flex flex-col items-center space-y-2.5">
      <UInput
        v-model="searchFriend"
        :placeholder="t('page--friends.placeholder')"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        autocomplete="off"
        class="w-[80vw]"
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

      <div class="flex w-[80vw] flex-wrap items-center justify-center gap-2">
        <SearchFilters :filters="filterConfig" @update:filter="setFilter" />
      </div>

      <div class="mt-2 flex flex-wrap items-center justify-center gap-3">
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

    <div ref="footerRef" class="mt-4">
      <ProfileModal @delete:friend="deleteFriend" />
    </div>
  </div>
</template>
