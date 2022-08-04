import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: `${process.env.REACT_APP_BASE_PATH}/locales/{{lng}}/{{ns}}.json`
    },

    ns: ["messages", "promo", "pages", "categories"]
  })

  export default i18n;