import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import initializeClientI18n from './i18n/initialize-client-i18n';
import getEnv from '~/core/get-env';
import { loadSelectedTheme } from '~/core/theming';
import configuration from '~/configuration';

const hydrate = () => {
  startTransition(() => {
    initializeClientI18n().then((i18next) => {
      const App = (
        <StrictMode>
          <I18nextProvider i18n={i18next}>
            <RemixBrowser />
          </I18nextProvider>
        </StrictMode>
      );

      if (isCypress()) {
        require('react-dom').hydrate(App, document);
      } else {
        hydrateRoot(document, App);
      }
    });
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}

// we need to make this check to make Cypress play nice with hydration
// https://github.com/remix-run/remix/issues/2570
function isCypress() {
  return getEnv().IS_CI === 'true';
}

if (configuration.enableThemeSwitcher) {
  loadSelectedTheme();
}
