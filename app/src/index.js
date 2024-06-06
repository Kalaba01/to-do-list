import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import global_en from './locales/en/global.json';
import global_fr from './locales/fr/global.json';
import global_hi from './locales/hi/global.json';
import global_zh from './locales/zh/global.json';

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: "en",
    resources: {
      en: {
        global: global_en,
      },
      fr: {
        global: global_fr,
      },
      hi: {
        global: global_hi,
      },
      zh: {
        global: global_zh,
      },
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
