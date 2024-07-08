import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
export const useAppStore = defineStore('appStore', {
  state: () => ({
  }),
  getters: {
    
  },
  actions: {
		reload(){
      const authStore = useAuthStore()
      authStore.reload()

    }
	},
})
