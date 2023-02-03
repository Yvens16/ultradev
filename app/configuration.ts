import { GoogleAuthProvider } from 'firebase/auth';
import getEnv from '~/core/get-env';

const env = getEnv() ?? {};

const configuration = {
  site: {
    name: 'Awesomely - Your SaaS Title',
    description: 'Your SaaS Description',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: env.SITE_URL,
    siteName: 'Awesomely',
    twitterHandle: '',
    githubHandle: '',
    language: 'en',
    convertKitFormId: '',
    locale: env.DEFAULT_LOCALE,
  },
  auth: {
    // Enable MFA. You must upgrade to GCP Identity Platform to use it.
    // see: https://cloud.google.com/identity-platform/docs/product-comparison
    enableMultiFactorAuth: true,
    // When enabled, users will be required to verify their email address
    // before being able to access the app
    requireEmailVerification: env.REQUIRE_EMAIL_VERIFICATION === 'true',
    // NB: Enable the providers below in the Firebase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: [GoogleAuthProvider],
    },
  },
  emulatorHost: env.FIREBASE_EMULATOR_HOST,
  emulator: env.EMULATOR === 'true',
  production: env.NODE_ENV === 'production',
  environment: env.ENVIRONMENT,
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    emailLinkSignIn: '/auth/link',
    onboarding: `/onboarding`,
    appHome: '/dashboard',
    settings: {
      profile: '/settings/profile',
      authentication: '/settings/profile/authentication',
      email: '/settings/profile/email',
      password: '/settings/profile/password',
    },
    api: {
      checkout: `/resources/stripe/checkout`,
      billingPortal: `/resources/stripe/portal`,
    },
    searchIndex: `/public/search-index`,
  },
  appCheckSiteKey: env.APPCHECK_KEY,
  email: {
    host: '',
    port: 587,
    user: '',
    password: '',
    senderAddress: 'MakerKit Team <info@makerkit.dev>',
  },
  sentry: {
    dsn: env.SENTRY_DSN,
  },
  stripe: {
    products: [
      {
        name: 'Basic',
        description: 'Description of your Basic plan',
        badge: `Up to 20 users`,
        features: [
          'Basic Reporting',
          'Up to 20 users',
          '1GB for each user',
          'Chat Support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$9',
            stripePriceId: 'basic-plan-mth',
            trialPeriodDays: 0,
          },
          {
            name: 'Yearly',
            price: '$90',
            stripePriceId: 'basic-plan-yr',
            trialPeriodDays: 0,
          },
        ],
      },
      {
        name: 'Pro',
        badge: `Most Popular`,
        recommended: true,
        description: 'Description of your Pro plan',
        features: [
          'Advanced Reporting',
          'Up to 50 users',
          '5GB for each user',
          'Chat and Phone Support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$29',
            stripePriceId: 'pro-plan-mth',
            trialPeriodDays: 0,
          },
          {
            name: 'Yearly',
            price: '$200',
            stripePriceId: 'pro-plan-yr',
            trialPeriodDays: 0,
          },
        ],
      },
      {
        name: 'Premium',
        description: 'Description of your Premium plan',
        badge: ``,
        features: [
          'Advanced Reporting',
          'Unlimited users',
          '50GB for each user',
          'Account Manager',
        ],
        plans: [
          {
            name: '',
            price: 'Contact us',
            stripePriceId: '',
            trialPeriodDays: 0,
            label: `Contact us`,
            href: `/contact`,
          },
        ],
      },
    ],
  },
};

export default configuration;
