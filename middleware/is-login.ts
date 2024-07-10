import { useAuthStore } from '@/store/auth.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const authStore = useAuthStore()

    if (!authStore.getIsLogin) {
    return navigateTo('/login')
  }
  }
})
