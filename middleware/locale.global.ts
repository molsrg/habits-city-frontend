// middleware/locale.global.ts
import { useLocaleStore } from '@/store/locale.store';

export default defineNuxtRouteMiddleware(() => {
  const localeStore = useLocaleStore();
  if (!localeStore.locale) {
    const savedLocale = localStorage.getItem('language') || 'en';
    localeStore.setLocale(savedLocale);
  }
});
