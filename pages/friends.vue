<template>
	<div class="friends">
		<UInput
			class="friends-search"
			size="xl"
			v-model="searchFriend"
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
definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'HS | Friends',
})

const searchFriend = ref('')

// TODO request in server
const addNewPeople = (username: string) => {
	console.log(username)
}

const people = [
	{
		username: 'CoolCat123',
		isOnline: true,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'SunnyDays789',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: false,
	},
	{
		username: 'GamerGuru456',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'MysticMoon234',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{
		username: 'TechTiger987',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'LuckyLady654',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{
		username: 'NinjaNerd321',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'StarStruck123',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{
		username: 'PixelPioneer789',
		isOnline: true,
		hasAvatar: '',
		inFriends: true,
	},
	{
		username: 'EpicEagle456',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: false,
	},
	{
		username: 'DreamDancer234',
		isOnline: true,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'CraftyCoder987',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{
		username: 'HappyHiker654',
		isOnline: true,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'BraveBear321',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{ username: 'FunnyFox123', isOnline: true, hasAvatar: '', inFriends: true },
	{
		username: 'CreativeCloud789',
		isOnline: false,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: false,
	},
	{
		username: 'WiseWolf456',
		isOnline: true,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'MagicMouse234',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
	{
		username: 'AdventureAce987',
		isOnline: true,
		hasAvatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
		inFriends: true,
	},
	{
		username: 'PeacefulPanda654',
		isOnline: false,
		hasAvatar: '',
		inFriends: false,
	},
]

const filteredPeople = computed(() => {
	return people.filter(user =>
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
