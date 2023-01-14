import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next';

import i18nextOptions from './i18next.config';

const i18nNext = new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLanguages,
    fallbackLanguage: i18nextOptions.fallbackLanguage,
  },
  i18next: {
    ...i18nextOptions,
  },
  backend: Backend,
});

export default i18nNext;
