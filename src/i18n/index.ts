/**
 * i18n Configuration
 *
 * Sets up internationalization for the application.
 * Currently supports English only, but can be easily extended
 * to support multiple languages.
 *
 * Features:
 * - Feature-based translation organization
 * - Type-safe translation keys
 * - Namespace support (todo.title, etc.)
 *
 * Usage:
 * import { useTranslation } from 'react-i18next'
 * const { t } = useTranslation()
 * t('todo.title') // "Todo List"
 */

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { en } from "./locales/en"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false, // React already escapes values
  },

  resources: {
    en: {
      translation: en,
    },
  },
})

export default i18n
