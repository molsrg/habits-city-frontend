<template>
	<div>
		Tasks
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'HS | Tasks',
})
</script>

<style scoped>

</style>