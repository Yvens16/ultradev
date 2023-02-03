import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirebaseError } from 'firebase/app';
import type { User } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { Trans } from 'react-i18next';

import If from '~/core/ui/If';
import { useSignUpWithEmailAndPassword } from '~/core/firebase/hooks';
import getFirebaseErrorCode from '~/core/firebase/utils/get-firebase-error-code';

import AuthErrorMessage from './AuthErrorMessage';
import EmailPasswordSignUpForm from '~/components/auth/EmailPasswordSignUpForm';
import Alert from '~/core/ui/Alert';
import configuration from '~/configuration';

const requireEmailVerification = configuration.auth.requireEmailVerification;

const EmailPasswordSignUpContainer: React.FCC<{
  onSignUp: (idToken: string) => unknown;
  onError?: (error: FirebaseError) => unknown;
  enforceEmailVerification?: boolean;
}> = ({ onSignUp, onError, enforceEmailVerification = true }) => {
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const redirecting = useRef(false);
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = useState(false);
  const sendEmailVerification = useSendEmailConfirmation();

  const loading = state.loading || redirecting.current;

  const callOnErrorCallback = useCallback(() => {
    if (state.error && onError) {
      onError(state.error);
    }
  }, [state.error, onError]);

  const createSession = useCallback(
    async (user: User) => {
      // if the user is required to verify their email, we display a message
      // in case it's an invite, we don't send the verification email
      if (requireEmailVerification && enforceEmailVerification) {
        await sendEmailVerification(user);

        setShowVerifyEmailAlert(true);
      } else {
        // using the ID token, we will make a request to initiate the session
        // to make SSR possible via session cookie
        const idToken = await user.getIdToken();

        redirecting.current = true;

        // we notify the parent component that
        // the user signed up successfully, so they can be redirected
        onSignUp(idToken);
      }
    },
    [enforceEmailVerification, onSignUp, sendEmailVerification]
  );

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  const onSubmit = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      const credential = await signUp(params.email, params.password);

      if (credential) {
        await createSession(credential.user);
      }
    },
    [loading, signUp, createSession]
  );

  return (
    <>
      <If condition={state.error}>
        {(error) => <AuthErrorMessage error={getFirebaseErrorCode(error)} />}
      </If>

      <If condition={showVerifyEmailAlert}>
        <VerifyEmailAlert />
      </If>

      <If condition={!showVerifyEmailAlert}>
        <EmailPasswordSignUpForm onSubmit={onSubmit} loading={loading} />
      </If>
    </>
  );
};

function VerifyEmailAlert() {
  return (
    <Alert type={'success'}>
      <Alert.Heading>
        <Trans i18nKey={'auth:emailConfirmationAlertHeading'} />
      </Alert.Heading>

      <p>
        <Trans i18nKey={'auth:emailConfirmationAlertBody'} />
      </p>
    </Alert>
  );
}

function useSendEmailConfirmation() {
  return useCallback((user: User) => {
    const fullPath = [
      configuration.site.siteUrl,
      configuration.paths.onboarding,
    ].join('/');

    return sendEmailVerification(user, {
      url: fullPath,
    });
  }, []);
}

export default EmailPasswordSignUpContainer;
