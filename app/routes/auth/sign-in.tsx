import { useCallback, useEffect } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link, useSubmit, useNavigation } from '@remix-run/react';

import { Trans } from 'react-i18next';
import { useAuth } from 'reactfire';

import createServerSessionActionServer from '~/lib/server/auth/actions/create-server-session-action.server';

import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import isBrowser from '~/core/generic/is-browser';

import getClientQueryParams from '~/core/generic/get-client-query-params';
import useGetCsrfToken from '~/core/firebase/hooks/use-get-csrf-token';

import OAuthProviders from '~/components/auth/OAuthProviders';
import EmailLinkAuth from '~/components/auth/EmailLinkAuth';
import PhoneNumberSignInContainer from '~/components/auth/PhoneNumberSignInContainer';
import EmailPasswordSignInContainer from '~/components/auth/EmailPasswordSignInContainer';

import configuration from '~/configuration';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import AuthCatchBoundary from '~/components/auth/AuthCatchBoundary';

export const action = createServerSessionActionServer;

export const CatchBoundary = AuthCatchBoundary;

export const meta: MetaFunction = () => {
  return {
    title: 'Sign In',
  };
};

const SIGN_UP_PATH = configuration.paths.signUp;

const FORCE_SIGN_OUT_QUERY_PARAM = 'signOut';
const NEEDS_EMAIL_VERIFICATION_QUERY_PARAM = 'needsEmailVerification';

function SignInPage() {
  const auth = useAuth();
  const submit = useSubmit();
  const getCsrfToken = useGetCsrfToken();
  const navigation = useNavigation();

  const onSignIn = useCallback(
    (idToken: string) => {
      const csrfToken = getCsrfToken() ?? '';
      const payload = { idToken, csrfToken };

      submit(payload, { method: 'post' });
    },
    [submit, getCsrfToken],
  );

  const shouldForceSignOut = useShouldSignOut();
  const shouldVerifyEmail = useShouldVerifyEmail();

  // force user signOut if the query parameter has been passed
  useEffect(() => {
    if (shouldForceSignOut) {
      void auth.signOut();
    }
  }, [auth, shouldForceSignOut]);

  if (navigation.state !== 'idle') {
    return <PageLoadingIndicator />;
  }

  return (
    <>
      <div>
        <Heading type={6}>
          <span className={'font-medium'}>
            <Trans i18nKey={'auth:signInHeading'} />
          </span>
        </Heading>
      </div>

      <OAuthProviders onSignIn={onSignIn} />

      <If condition={configuration.auth.providers.emailPassword}>
        <div>
          <span className={'text-xs text-gray-400'}>
            <Trans i18nKey={'auth:orContinueWithEmail'} />
          </span>
        </div>

        <EmailPasswordSignInContainer
          shouldVerifyEmail={shouldVerifyEmail}
          onSignIn={onSignIn}
        />
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer onSignIn={onSignIn} />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth />
      </If>

      <div className={'flex justify-center text-xs'}>
        <p className={'flex space-x-1'}>
          <span>
            <Trans i18nKey={'auth:doNotHaveAccountYet'} />
          </span>

          <Link
            className={'text-primary-800 hover:underline dark:text-primary-500'}
            to={SIGN_UP_PATH}
          >
            <Trans i18nKey={'auth:signUp'} />
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignInPage;

function useShouldSignOut() {
  return useQueryParam(FORCE_SIGN_OUT_QUERY_PARAM) === 'true';
}

function useShouldVerifyEmail() {
  return useQueryParam(NEEDS_EMAIL_VERIFICATION_QUERY_PARAM) === 'true';
}

function useQueryParam(param: string) {
  if (!isBrowser()) {
    return null;
  }

  const params = getClientQueryParams();

  return params.get(param);
}
