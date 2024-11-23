<script lang="ts" setup>
import { computed, ref } from 'vue';

import { getDayDeclension } from '@/constants/i18n';
import { daysSince } from '@/helpers/dateFormat.helper';

interface PeopleInfo {
  username: string;
  avatar?: string;
  rating: number;
  createdAt: string;
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
          <UAvatar :alt="peopleInfo.username" :src="peopleInfo.avatar || ''" size="lg" />
        </UTooltip>
        <!--        <UTooltip :text="t('page&#45;&#45;friends.card.tooltip-avatar')">-->
        <!--          <UChip :ui="{ base: '-mx-1 rounded-none ring-0', background: '' }" inset position="bottom-right" size="md">-->
        <!--            <UAvatar :alt="peopleInfo.username" :src="peopleInfo.avatar || ''" size="lg" />-->

        <!--            <template #content>-->
        <!--              <UAvatar-->
        <!--                :ui="{ rounded: 'rounded-md' }"-->
        <!--                alt="Avatar"-->
        <!--                class="shadow-md"-->
        <!--                size="2xs"-->
        <!--                src="https://avatars.githubusercontent.com/in/80442?v=4"-->
        <!--              />-->
        <!--              <UIcon class="text-yellow-500" name="star" size="lg" />-->
        <!--              <UIcon class="h-4 w-4 text-yellow-700" name="i-heroicons-light-bulb" />-->
        <!--            </template>-->
        <!--          </UChip>-->
        <!--        </UTooltip>-->
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
