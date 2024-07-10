<template>
  <div>
    <NuxtLayout>
      <NuxtPage class="container" />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const route = useRoute()
  const router = useRouter()
	
  if (route.path === '/') {
    router.push('/habits-city-frontend')
  }
})
</script>

<style>
.container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  margin-top: 2vh;
}
</style>
