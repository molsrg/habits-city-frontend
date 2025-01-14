// middleware/locale.global.ts
import { useLocaleStore } from '@/store/locale.store';

export default defineNuxtRouteMiddleware((to, from) => {
  const localeStore = useLocaleStore();
  if (!localeStore.locale) {
    const savedLocale = localStorage.getItem('language') || 'en';
    localeStore.setLocale(savedLocale);
  }

  // Log the `to` and `from` routes
  console.log('Navigating from:', from.fullPath);
  console.log('Navigating to:', to.fullPath);
});
