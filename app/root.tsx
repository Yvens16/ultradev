import stylesheetUrl from './styles/dist.css';

import type { LoaderArgs } from '@remix-run/server-runtime';
import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Meta as RemixMeta,
} from '@remix-run/react';

import classNames from 'classnames';
import i18next from './i18n/i18n.server';

import Head from '~/core/ui/Head';
import { parseThemeCookie } from '~/lib/server/cookies/theme.cookie';
import AppRouteLoadingIndicator from '~/components/AppRouteLoadingIndicator';
import RootCatchBoundary from '~/components/RootCatchBoundary';
import getEnv from '~/core/get-env';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesheetUrl }];
};

export const meta = () => {
  const env = getEnv();

  return {
    title: env.SITE_TITLE,
    description: env.SITE_DESCRIPTION,
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const theme = await parseThemeCookie(request);
  const locale = await i18next.getLocale(request);

  return json({
    locale,
    theme,
    ENV: getBrowserEnvironment(),
  });
};

export default function App() {
  const data = useLoaderData<typeof loader>();

  const className = classNames({
    dark: data.theme === 'dark',
  });

  return (
    <html lang={data.locale} className={className}>
      <head>
        <RemixMeta />
        <Links />
        <Head />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </head>
      <body className="h-full">
        <Outlet />
        <AppRouteLoadingIndicator />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const CatchBoundary = RootCatchBoundary;

function getBrowserEnvironment() {
  const env = process.env;

  return {
    FIREBASE_API_KEY: env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_AUTH_DOMAIN: env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_AUTH_EMULATOR_PORT: env.FIREBASE_AUTH_EMULATOR_PORT,
    FIREBASE_MESSAGING_SENDER_ID: env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: env.FIREBASE_MEASUREMENT_ID,
    EMULATOR: env.EMULATOR,
    EMULATOR_HOST: env.FIREBASE_EMULATOR_HOST,
    FIRESTORE_EMULATOR_PORT: env.FIRESTORE_EMULATOR_PORT,
    SITE_URL: env.SITE_URL,
    SITE_TITLE: env.SITE_TITLE,
    SITE_DESCRIPTION: env.SITE_DESCRIPTION,
    DEFAULT_LOCALE: env.DEFAULT_LOCALE,
    NODE_ENV: env.NODE_ENV,
    SENTRY_DSN: env.SENTRY_DSN,
    APPCHECK_KEY: env.APPCHECK_KEY,
    APPCHECK_DEBUG_TOKEN: env.APPCHECK_DEBUG_TOKEN,
  };
}
