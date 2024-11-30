<script lang="ts" setup>
import { FRIENDS_STATUS } from '@/constants/friends';
import { getDayDeclension } from '@/constants/i18n';
import { daysSince } from '@/helpers/dateFormat.helper';

interface PeopleInfo {
  username: string;
  avatar?: string;
  rating: number;
  createdAt: string;
  isFriend: string;
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

const isAdded = ref(false);
const addFriend = () => {
  isAdded.value = true;
  emit('add:people', props.peopleInfo.username);
};

const openModalProfile = () => {
  emit('open:profile', props.peopleInfo.username);
};

const dayWithUs = daysSince(props.peopleInfo.createdAt);

const withUsText = computed(() => {
  const dayText = getDayDeclension(dayWithUs, t);
  return t('page--friends.card.days-with-us', { count: dayWithUs, day: dayText });
});
</script>

<template>
  <UCard>
    <div class="flex w-64 items-center gap-4">
      <div class="cursor-pointer" @click="openModalProfile">
        <UTooltip :text="t('page--friends.card.tooltip-avatar')">
          <UChip :ui="{ base: '-mx-1 rounded-none ring-0', background: '' }" inset position="bottom-right" size="md">
            <UAvatar :alt="peopleInfo.username" :src="peopleInfo.avatar || ''" size="lg" />

            <template #content>
              <UIcon
                v-if="FRIENDS_STATUS.FOLLOWED === props.peopleInfo?.isFriend"
                class="h-5 w-5 text-green-500"
                name="i-heroicons-chevron-double-down-solid"
              />
              <UIcon
                v-if="FRIENDS_STATUS.FOLLOWING === props.peopleInfo?.isFriend"
                class="h-5 w-5 text-blue-500"
                name="i-heroicons-chevron-double-up-solid"
              />
            </template>
          </UChip>
        </UTooltip>
      </div>
      <div class="flex flex-col items-start gap-2">
        <div class="flex flex-col items-start">
          <div class="mb-2 flex items-center gap-1">
            <UBadge color="white" variant="solid"> @ {{ isValidPeopleLength }}</UBadge>
          </div>
          <UBadge color="blue" variant="soft">
            {{ withUsText }}
          </UBadge>

          <UButton
            v-if="(props.peopleInfo?.isFriend === FRIENDS_STATUS.NOT_FOLLOWING || props.peopleInfo?.isFriend === FRIENDS_STATUS.FOLLOWED) && !isAdded"
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
            v-if="props.peopleInfo?.isFriend === FRIENDS_STATUS.FRIENDS"
            :label="t('page--friends.card.inFriends')"
            class="mt-1"
            color="green"
            disabled
            icon="i-heroicons-users"
            size="2xs"
            variant="link"
          />

          <UButton
            v-if="props.peopleInfo?.isFriend === FRIENDS_STATUS.FOLLOWING || isAdded"
            :label="t('page--friends.card.followed')"
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
