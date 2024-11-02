import en from './i18n/en.json';
import fr from './i18n/fr.json';
import ru from './i18n/ru.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ru,
    fr,
  },
}));
