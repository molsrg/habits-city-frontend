<script lang="ts" setup>
import { computed, ref } from 'vue';

import { daysSince } from '@/helpers/dateFormat.helper';

interface PeopleInfo {
  username: string;
  avatar?: string;
  rating: number;
}

const { t } = useI18n();
const props = defineProps({
  peopleInfo: { type: Object as () => PeopleInfo, required: true },
});

const emit = defineEmits(['add:people', 'open:profile']);

const isValidPeopleLength = computed(() => {
  const username = props.peopleInfo.username;
  return username.length > 22 ? username.slice(0, 21) + '...' : username;
});

const addFriend = () => {
  emit('add:people', props.peopleInfo.username);
};

const openModalProfile = () => {
  emit('open:profile', props.peopleInfo.username);
};

const inFriends = ref(false);
const daysSinceValue = computed(() => daysSince('2024-11-05T00:00:00'));
</script>

<template>
  <UCard>
    <div class="flex w-64 items-center gap-4">
      <div class="cursor-pointer" @click="openModalProfile">
        <UTooltip :text="t('page--friends.card.tooltip-avatar')">
          <UAvatar :alt="peopleInfo.username" :src="peopleInfo.avatar || ''" size="lg" />
        </UTooltip>
      </div>

      <div class="flex flex-col items-start gap-2">
        <div class="flex flex-col items-start">
          <div class="mb-2 flex items-center gap-1">
            <UBadge color="white" variant="solid"> @ {{ isValidPeopleLength }}</UBadge>
          </div>
          <UBadge color="blue" variant="soft">
            {{
              t('page--friends.card.days-with-us', {
                count: daysSinceValue,
                days: t('page--friends.card.days', { count: daysSinceValue }),
              })
            }}
          </UBadge>

          <UButton
            v-if="!inFriends"
            :label="t('page--friends.card.subscribe')"
            class="mt-1"
            color="green"
            icon="i-heroicons-user-plus"
            in-friends
            size="2xs"
            variant="ghost"
            @click="addFriend"
          />

          <UButton
            v-else
            :label="t('page--friends.card.inFriends')"
            class="mt-1"
            color="green"
            disabled
            icon="i-heroicons-users"
            size="2xs"
            variant="link"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
