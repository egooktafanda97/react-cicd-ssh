import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Impor file JSON terjemahan
import en from '../assets/locales/en.json';
import id from '../assets/locales/id.json';

// Konfigurasi sumber daya bahasa
const resources = {
    en: { translation: en },
    id: { translation: id },
};

i18n
    .use(initReactI18next) // Integrasi dengan React
    .init({
        resources, // Muat sumber daya bahasa
        lng: 'en', // Bahasa default
        fallbackLng: 'en', // Bahasa fallback
        debug: true, // Debug mode
        interpolation: {
            escapeValue: false, // React sudah melindungi dari XSS
        },
    });

export default i18n;
