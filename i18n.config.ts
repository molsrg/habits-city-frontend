import en from '@/plugins/i18n/en.json'
import fr from '@/plugins/i18n/fr.json'
import ru from '@/plugins/i18n/ru.json'

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: {
		en,
		ru,
		fr,
	},
}))
