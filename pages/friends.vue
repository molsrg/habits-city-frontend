<template>
	<div class="friends">
		<UInput
			v-model="searchFriend"
			class="friends-search"
			size="xl"
			name="search-friend"
			placeholder="Enter your friend's username..."
			icon="i-heroicons-magnifying-glass-20-solid"
			autocomplete="off"
			:ui="{ icon: { trailing: { pointer: '' } } }"
		>
			<template #trailing>
				<UButton
					v-show="searchFriend !== ''"
					color="gray"
					variant="link"
					icon="i-heroicons-x-mark-20-solid"
					:padded="false"
					@click="searchFriend = ''"
				/>
			</template>
		</UInput>
		<div class="friends-container">
			<CardsProfile
				v-for="user in filteredPeople"
				:key="user.username"
				:people-info="user"
				@add-people="addNewPeople"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFriendStore } from '@/store/friend.store'
definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'HS | Friends',
})
const friendStore = useFriendStore()


const searchFriend = ref('')

const addNewPeople = (username: string) => {
  friendStore.addNewFriend(username)
}


const filteredPeople = computed(() => {
	return friendStore.getSuggestedFriends.filter(user =>
		user.username.toLowerCase().includes(searchFriend.value.toLowerCase())
	)
})
</script>

<style scoped>
.friends {
	margin-top: 5vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 10px;
}

.friends-search {
	width: 60vw;
}

.friends-container {
	margin-top: 2vh;
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
}
</style>
