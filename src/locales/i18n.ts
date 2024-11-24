import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/common.json';
import pl from './pl/common.json';

i18n.use(initReactI18next).init({
  debug: true,
  interpolation: {
    escapeValue: false
  },
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'common',
  ns: 'common',
  fallbackNS: 'common',
  resources: {
    en: {
      common: en
    },
    pl: {
      common: pl
    }
  },
  missingKeyHandler: function (lng, ns, key, fallbackValue) {
    console.warn(
      `Missing translation for key: ${key} in ${lng}/${ns} with fallback: ${fallbackValue}`
    );
  }
});

export default i18n;
