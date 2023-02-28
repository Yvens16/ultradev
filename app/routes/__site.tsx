import { Outlet } from '@remix-run/react';
import { useState } from 'react';

import firebaseConfig from '../firebase.config';
import FirebaseAppShell from '~/core/firebase/components/FirebaseAppShell';
import FirebaseAuthProvider from '~/core/firebase/components/FirebaseAuthProvider';
import UserSessionContext from '~/core/session/contexts/user-session';
import FirebaseAnalyticsProvider from '~/core/firebase/components/FirebaseAnalyticsProvider';
import SiteHeader from '~/components/SiteHeader';
import Footer from '~/components/Footer';

import type UserSession from '~/core/session/types/user-session';

function SiteLayout() {
  const [userSession, setUserSession] = useState<Maybe<UserSession>>();

  return (
    <FirebaseAppShell config={firebaseConfig}>
      <FirebaseAuthProvider
        useEmulator={firebaseConfig.emulator}
        setUserSession={setUserSession}
      >
        <FirebaseAnalyticsProvider>
          <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            <SiteHeader />
            <main>
              <Outlet />
            </main>
            <Footer />
          </UserSessionContext.Provider>
        </FirebaseAnalyticsProvider>
      </FirebaseAuthProvider>
    </FirebaseAppShell>
  );
}

export default SiteLayout;
