import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';

import type { Auth, User } from 'firebase/auth';

import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth';

import isBrowser from '~/core/generic/is-browser';
import useDestroySession from '~/core/hooks/use-destroy-session';
import type UserSession from '~/core/session/types/user-session';
import getEnv from '~/core/get-env';

// make sure we're not using IndexedDB when SSR
// as it is only supported on browser environments
const PERSISTENCE = isBrowser()
  ? indexedDBLocalPersistence
  : inMemoryPersistence;

export const FirebaseAuthStateListener: React.FCC<{
  auth: Auth;
  onAuthStateChange: (user: User | null) => void | Promise<void>;
}> = ({ children, onAuthStateChange, auth }) => {
  // {@link onIdTokenChanged} will call the
  // callback when the user ID token changes
  // for example, when the user signs out
  // we update user context when ID token changes
  useEffect(() => {
    const subscription = auth.onIdTokenChanged(onAuthStateChange);

    return () => subscription();
  }, [auth, onAuthStateChange]);

  return <>{children}</>;
};

export default function FirebaseAuthProvider({
  setUserSession,
  children,
  useEmulator,
}: React.PropsWithChildren<{
  useEmulator: boolean;
  setUserSession: React.Dispatch<React.SetStateAction<Maybe<UserSession>>>;
}>) {
  const app = useFirebaseApp();
  const signOut = useDestroySession();
  const userRef = useRef<Maybe<User>>();

  const sdk = useMemo(
    () => initializeAuth(app, { persistence: PERSISTENCE }),
    [app]
  );

  const shouldConnectEmulator = useEmulator && !('emulator' in sdk.config);

  const onAuthStateChanged = useCallback(
    async (user: User | null) => {
      // if the user is logged in
      if (user) {
        // if the local reference is different
        if (user !== userRef.current) {
          userRef.current = user;

          // we update the UserContextSession context
          return setUserSession((session) => {
            const disabled = session?.auth?.disabled ?? false;
            const multiFactor = session?.auth?.multiFactor ?? [];

            return {
              auth: {
                ...user,
                customClaims: {},
                disabled,
                multiFactor,
              },
              data: session?.data,
            };
          });
        }
      } else {
        // if the user is no longer defined and user was originally signed-in
        // (because userSession?.auth is defined) then we need to clear the
        // session cookie
        if (userRef.current) {
          try {
            // we need to delete the session cookie used for SSR
            signOut();
          } finally {
            userRef.current = undefined;

            setUserSession && setUserSession(undefined);
          }
        }
      }
    },
    [setUserSession, signOut]
  );

  useEffect(() => {
    if (shouldConnectEmulator) {
      const host = getAuthEmulatorHost();

      connectAuthEmulator(sdk, host);
    }
  }, [sdk, shouldConnectEmulator]);

  return (
    <AuthProvider sdk={sdk}>
      <FirebaseAuthStateListener
        auth={sdk}
        onAuthStateChange={onAuthStateChanged}
      >
        {children}
      </FirebaseAuthStateListener>
    </AuthProvider>
  );
}

function getAuthEmulatorHost() {
  const env = getEnv();
  const host = env.FIREBASE_EMULATOR_HOST ?? '127.0.0.1';
  const port = env.FIREBASE_AUTH_EMULATOR_PORT ?? 9099;

  return ['http://', host, ':', port].join('');
}
