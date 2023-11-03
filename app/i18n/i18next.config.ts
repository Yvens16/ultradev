import getEnv from '~/core/get-env';

const env = getEnv();
const DEFAULT_LOCALE = env.DEFAULT_LOCALE ?? 'en';

const i18Config = {
  fallbackLanguage: DEFAULT_LOCALE,
  supportedLanguages: [DEFAULT_LOCALE],
  defaultNS: ['common', 'auth', 'organization', 'profile', 'subscription'],
  react: { useSuspense: false },
};

export default i18Config;
