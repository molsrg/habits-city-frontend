// store/locale.ts
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'en',
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
