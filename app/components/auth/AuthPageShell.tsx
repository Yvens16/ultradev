import { useState } from 'react';

import Logo from '~/core/ui/Logo';
import FirebaseAuthProvider from '~/core/firebase/components/FirebaseAuthProvider';
import FirebaseAppShell from '~/core/firebase/components/FirebaseAppShell';
import firebaseConfig from '../../firebase.config';
import type UserSession from '~/core/session/types/user-session';

function AuthPageShell({ children }: React.PropsWithChildren) {
  const [, setUserSession] = useState<Maybe<UserSession>>();

  return (
    <FirebaseAppShell config={firebaseConfig}>
      <FirebaseAuthProvider
        setUserSession={setUserSession}
        useEmulator={firebaseConfig.emulator}
      >
        <div
          className={
            'flex h-screen flex-col items-center justify-center space-y-4' +
            ' md:space-y-8 lg:bg-gray-50 dark:lg:bg-black-700'
          }
        >
          <div
            className={`flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent bg-white px-2 py-1 dark:bg-black-600 dark:bg-black-400 md:w-8/12 md:border md:px-8 md:py-6 md:shadow-xl dark:md:border-black-400 lg:w-5/12 lg:px-6 xl:w-4/12 2xl:w-3/12`}
          >
            <Logo />

            {children}
          </div>
        </div>
      </FirebaseAuthProvider>
    </FirebaseAppShell>
  );
}

export default AuthPageShell;
