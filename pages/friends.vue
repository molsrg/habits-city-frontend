<script lang="ts" setup>
import { useFriendStore } from '@/store/friend.store';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'HS | Friends',
});

const friendStore = useFriendStore();
const searchFriend = ref('');

const addNewPeople = (username: string): void => {
  friendStore.addNewFriend(username);
};

let debounceTimeout: ReturnType<typeof setTimeout>;
watch(searchFriend, (newValue) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    if (newValue.trim()) {
      friendStore.fetchSuggestedFriends(newValue.trim());
    }
  }, 300);
});
</script>

<template>
  <div class="friends">
    <UInput
      v-model="searchFriend"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      autocomplete="off"
      class="friends__search"
      icon="i-heroicons-magnifying-glass-20-solid"
      name="search-friend"
      placeholder="Enter your friend's username..."
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
        @add:people="addNewPeople"
      />
      <div v-if="friendStore.getSuggestedFriends.length === 0">
        <UCard>
          <template #header>
            <Placeholder class="h-8" />
          </template>

          <Placeholder class="h-32" />

          <template #footer>
            <Placeholder class="h-8" />
          </template>
        </UCard>
      </div>
    </div>
  </div>
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
