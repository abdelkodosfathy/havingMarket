import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";

import translationEn from "./locale/en.json";
import translationAr from "./locale/ar.json";
const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

i18n
  .use(i18nextBrowserLanguagedetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar",
    interpolation: {
      escapeValue: false,
    },
    lng: localStorage.getItem("lang") || "ar",
    react: {
      useSuspense: false,
    },
  });

export default i18n;
