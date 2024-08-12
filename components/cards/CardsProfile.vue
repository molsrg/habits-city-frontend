<template>
	<UCard>
		<div class="flex items-center space-x-4 w-[250px]">
			<UChip
				inset
				:color="isOnline.color"
				position="bottom-right"
				:text="isOnline.text"
				size="lg"
			>
				<UAvatar
					chip-position="bottom-right"
					size="lg"
					:src="peopleInfo.hasAvatar || ''"
					alt="N N"
				/>
			</UChip>

			<div class="space-y-2 flex flex-col items-start gap-1 flex-wrap">
				<div class="flex flex-wrap gap-2 flex-col items-start">
					<UBadge color="white" variant="solid">
						@ {{ isValidPeopleLength }}
					</UBadge>
					<UButton
						v-if="peopleInfo.inFriends"
						:icon="addedPeople ? 'i-heroicons-check' : 'i-heroicons-user-plus'"
						color="green"
						variant="ghost"
						:label="addedPeople ? 'Application sent' : 'Add Friend'"
						:disabled="addedPeople"
						size="2xs"
						@click="addFriend"
					/>

					<UButton
						v-else
						icon="i-heroicons-users"
						color="green"
						variant="link"
						label="Already friends"
						size="2xs"
						disabled
					/>
				</div>
				<USkeleton class="h-4 w-[200px]" />
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">

const props = defineProps({
	peopleInfo: { type: Object, required: true },
})
const emit = defineEmits(['addPeople'])

const isValidPeopleLength = computed(() => {
	if (props.peopleInfo.username.length > 22) {
		return props.peopleInfo.username.slice(0, 21) + '...'
	}
	return props.peopleInfo.username
})

const addedPeople = ref(false)
const isOnline = computed(() => {
	if (props.peopleInfo.isOnline) {
		return {
			text: 'on',
			color: 'green',
		}
	}
	return {
		text: 'off',
		color: 'red',
	}
})

const addFriend = () => {
	emit('addPeople', props.peopleInfo.username)
	addedPeople.value = true
}
</script>

<style scoped></style>
