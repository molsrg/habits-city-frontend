<template>
  <UCard>
    <div class="people-card">
      <UAvatar
        :src="peopleInfo.hasAvatar || ''"
        alt="Avatar"
        chip-position="bottom-right"
        size="lg"
      />

      <div class="people-card__info">
        <div class="people-card__details">
          <UBadge class="people-card__username" color="white" variant="solid">
            @ {{ isValidPeopleLength }}
          </UBadge>

          <UButton
            v-if="showAddFriendButton"
            :disabled="addedPeople"
            :icon="addedPeople ? 'i-heroicons-check' : 'i-heroicons-user-plus'"
            :label="addedPeople ? 'Application sent' : 'Add Friend'"
            class="people-card__button"
            color="green"
            size="2xs"
            variant="ghost"
            @click="addFriend"
          />

          <UButton
            v-else
            class="people-card__button--disabled"
            color="green"
            disabled
            icon="i-heroicons-users"
            label="Already friends"
            size="2xs"
            variant="link"
          />
        </div>
        <USkeleton class="people-card__skeleton" />
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface PeopleInfo {
  username: string;
  hasAvatar?: string;
  inFriends: boolean;
}

const props = defineProps({
  peopleInfo: { type: Object as () => PeopleInfo, required: true },
});

const emit = defineEmits(['add:people']);

const addedPeople = ref(false);

const isValidPeopleLength = computed(() => {
  const username = props.peopleInfo.username;
  return username.length > 22 ? username.slice(0, 21) + '...' : username;
});

const showAddFriendButton = computed(() => !props.peopleInfo.inFriends);

const addFriend = () => {
  emit('add:people', props.peopleInfo.username);
  addedPeople.value = true;
};
</script>

<style lang="scss" scoped>
.people-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 250px;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__username {
    margin-bottom: 0.5rem;
  }

  &__button {
  }

  &__button--disabled {
  }

  &__skeleton {
    height: 1rem;
    width: 200px;
  }
}
</style>
