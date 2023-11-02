import { useNavigate } from '@remix-run/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from 'reactfire';
import type { MultiFactorError, User } from 'firebase/auth';
import { isSignInWithEmailLink, signInWithEmailLink } from '@firebase/auth';
import { Trans } from 'react-i18next';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Spinner from '~/core/ui/Spinner';

import isBrowser from '~/core/generic/is-browser';
import configuration from '~/configuration';
import useRequestState from '~/core/hooks/use-request-state';
import useCreateServerSideSession from '~/core/hooks/use-create-server-side-session';
import getFirebaseErrorCode from '~/core/firebase/utils/get-firebase-error-code';
import isMultiFactorError from '~/core/firebase/utils/is-multi-factor-error';
import AuthErrorMessage from '~/components/auth/AuthErrorMessage';
import MultiFactorAuthChallengeModal from '~/components/auth/MultiFactorAuthChallengeModal';

// this is the key we use for storing the email locally
// so we can verify it is the same
const EMAIL_LOCAL_STORAGE_KEY = 'emailForSignIn';

function AuthLinkPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const requestExecutedRef = useRef<boolean>();
  const { state, setError } = useRequestState<void>();
  const [sessionRequest, sessionRequestState] = useCreateServerSideSession();
  
  const [multiFactorAuthError, setMultiFactorAuthError] =
    useState<Maybe<MultiFactorError>>();

  const loading = sessionRequestState.loading || sessionRequestState.loading;

  const redirectToAppHome = useCallback(() => {
    return navigate(configuration.paths.appHome);
  }, [navigate]);

  const onSignInSuccess = useCallback(
    async (user: User) => {
      // we can create the session and store a cookie to make SSR work
      await sessionRequest(user);

      // let's clear the email from the storage
      clearEmailFromStorage();

      // redirect user to the home page
      await redirectToAppHome();
    },
    [redirectToAppHome, sessionRequest]
  );

  // in this effect, we execute the functions to log the user in
  useEffect(() => {
    // let's prevent duplicate calls (which should only happen in dev mode)
    if (requestExecutedRef.current) {
      return;
    }

    const href = getOriginHref();

    // do not run on the server
    if (!href) {
      return;
    }

    // let's get email used to get the link
    if (!isSignInWithEmailLink(auth, href)) {
      setError('generic');

      return;
    }

    const email = getStorageEmail();

    // let's verify the stored email is the same
    if (!email) {
      setError('generic');

      return;
    }

    void (async () => {
      requestExecutedRef.current = true;

      try {
        // sign in with link, and retrieve the ID Token
        const credential = await signInWithEmailLink(auth, email, href);

        return onSignInSuccess(credential.user);
      } catch (error) {
        if (isMultiFactorError(error)) {
          setMultiFactorAuthError(error);
        } else {
          setError(getFirebaseErrorCode(error));
        }
      }
    })();
  }, [
    auth,
    loading,
    onSignInSuccess,
    redirectToAppHome,
    sessionRequest,
    setError,
  ]);

  return (
    <>
      <If condition={loading}>
        <LoadingState />
      </If>

      <If condition={state.error}>
        <div className={'flex flex-col space-y-2'}>
          <AuthErrorMessage error={state.error as string} />

          <Button color={'transparent'} href={configuration.paths.signIn}>
            <Trans i18nKey={'auth:getNewLink'} />
          </Button>
        </div>
      </If>

      <If condition={multiFactorAuthError}>
        {(error) => (
          <MultiFactorAuthChallengeModal
            cancelButton={false}
            error={error}
            isOpen={true}
            setIsOpen={() => setMultiFactorAuthError(undefined)}
            onSuccess={(credential) => {
              return onSignInSuccess(credential.user);
            }}
          />
        )}
      </If>
    </>
  );
}

export default AuthLinkPage;

function LoadingState() {
  return (
    <div className={'flex space-x-2'}>
      <Spinner />

      <span>
        <Trans i18nKey={'auth:signingIn'} />
      </span>
    </div>
  );
}

function getStorageEmail() {
  if (!isBrowser()) {
    return;
  }

  return window.localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY);
}

function clearEmailFromStorage() {
  window.localStorage.removeItem(EMAIL_LOCAL_STORAGE_KEY);
}

function getOriginHref() {
  if (!isBrowser()) {
    return;
  }

  return window.location.href;
}
