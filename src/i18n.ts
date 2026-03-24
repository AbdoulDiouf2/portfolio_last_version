import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr/translation.json';
import en from './locales/en/translation.json';

const savedLang = localStorage.getItem('lang');
const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en }
  },
  lng: savedLang || browserLang,
  fallbackLng: 'fr',
  interpolation: { escapeValue: false }
});

export default i18n;
