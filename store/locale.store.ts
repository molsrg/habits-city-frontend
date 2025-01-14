export const useLocaleStore = defineStore('locale', {
  persist: true,
  state: () => ({
    locale: 'en',
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
