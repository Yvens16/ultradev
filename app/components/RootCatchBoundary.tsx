import { Links, Meta, Scripts, useCatch } from '@remix-run/react';
import { Trans } from 'react-i18next';

import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

import SiteHeader from '~/components/SiteHeader';
import FirebaseAppShell from '~/core/firebase/components/FirebaseAppShell';
import FirebaseAuthProvider from '~/core/firebase/components/FirebaseAuthProvider';

import firebaseConfig from '../firebase.config';
import HttpStatusCode from '~/core/generic/http-status-code.enum';
import Heading from '~/core/ui/Heading';

function RootCatchBoundary() {
  const error = useCatch();

  return (
    <html>
      <head>
        <Meta />
        <Links />
        <Scripts />
      </head>
      <body>
        <FirebaseAppShell config={firebaseConfig}>
          <FirebaseAuthProvider
            useEmulator={firebaseConfig.emulator}
            userSession={undefined}
            setUserSession={() => ({})}
          >
            <SiteHeader />

            <div
              className={
                'm-auto flex min-h-[50vh] w-full items-center justify-center'
              }
            >
              <div className={'flex flex-col space-y-8'}>
                <div className={'flex space-x-8 divide-x divide-gray-100'}>
                  <div>
                    <Heading type={1}>
                      <span className={'text-primary-500'}>
                        {error.status === HttpStatusCode.NotFound ? 404 : 500}
                      </span>
                    </Heading>
                  </div>

                  <div className={'flex flex-col space-y-4 pl-8'}>
                    <div className={'flex flex-col space-y-2'}>
                      <div>
                        <Heading type={1}>
                          <If
                            condition={error.status === HttpStatusCode.NotFound}
                            fallback={
                              <Trans i18nKey={'common:genericServerError'} />
                            }
                          >
                            <Trans i18nKey={'common:pageNotFound'} />
                          </If>
                        </Heading>
                      </div>

                      <p className={'text-gray-500 dark:text-gray-300'}>
                        <If
                          condition={error.status === HttpStatusCode.NotFound}
                          fallback={
                            <Trans
                              i18nKey={'common:genericServerErrorHeading'}
                            />
                          }
                        >
                          <Trans i18nKey={'common:pageNotFoundSubHeading'} />
                        </If>
                      </p>
                    </div>

                    <div className={'flex space-x-4'}>
                      <Button color={'secondary'} href={'/'}>
                        <Trans i18nKey={'common:contactUs'} />
                      </Button>

                      <Button href={'/'}>
                        <Trans i18nKey={'common:backToHomePage'} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FirebaseAuthProvider>
        </FirebaseAppShell>
      </body>
    </html>
  );
}

export default RootCatchBoundary;
