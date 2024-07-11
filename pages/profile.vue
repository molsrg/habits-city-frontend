<template>
	<div>
		It s Profile
		<VerificatedPhone />
	</div>
</template>

<script setup lang='ts'>
import VerificatedPhone from '../components/modal/VerificatedPhone.vue'
definePageMeta({
  middleware: [
    'auth',
  ],
});
</script>

<style lang="scss" scoped>

</style>