// composables/useLocale.ts
// import { ref, watchEffect } from 'vue'
// import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()
  const localeWord = ref(null)

  watchEffect(async () => {
    try {
      const module = await import(`./../i18n/${locale.value}.json`)
      localeWord.value = module.default
    } catch (error) {
      console.error('Error loading locale file:', error)
    }
  })

  return {
    localeWord
  }
}
