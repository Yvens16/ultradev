import { json, redirect } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/server-runtime';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import getLoggedInUser from '~/core/firebase/admin/auth/get-logged-in-user';
import initializeFirebaseAdminApp from '~/core/firebase/admin/initialize-firebase-admin-app';
import getUserInfoById from '~/core/firebase/admin/auth/get-user-info-by-id';
import createCsrfCookie from '~/core/generic/create-csrf-token';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';

import { getUserData } from '~/lib/server/queries';
import { parseSessionIdCookie } from '~/lib/server/cookies/session.cookie';

import {
  parseCsrfSecretCookie,
  serializeCsrfSecretCookie,
} from '~/lib/server/cookies/csrf-secret.cookie';

import {
  parseOrganizationIdCookie,
  serializeOrganizationIdCookie,
} from '~/lib/server/cookies/organization.cookie';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';

import configuration from '~/configuration';

const loadAppDataServer = async ({ request }: LoaderArgs) => {
  try {
    await initializeFirebaseAdminApp();

    const session = await parseSessionIdCookie(request);
    const metadata = await getUserAuthMetadata(session);

    // if for any reason we're not able to fetch the user's data, we redirect
    // back to the login page
    if (!metadata) {
      return redirectToLogin({
        returnUrl: request.url,
      });
    }

    const isEmailVerified = metadata.emailVerified;

    const requireEmailVerification =
      configuration.auth.requireEmailVerification;

    // when the user is not yet verified and we require email verification
    // redirect them back to the login page
    if (!isEmailVerified && requireEmailVerification) {
      return redirectToLogin({
        returnUrl: request.url,
        needsEmailVerification: true,
      });
    }

    const isOnboarded = Boolean(metadata?.customClaims?.onboarded);

    // when the user is not yet onboarded,
    // we simply redirect them back to the onboarding flow
    if (!isOnboarded) {
      return redirectToOnboarding();
    }

    // we fetch the user record from Firestore
    // which is a separate object from the auth metadata
    const user = await getUserData(metadata.uid);
    const currentOrganizationId = await parseOrganizationIdCookie(request);

    // if the user wasn't found, redirect to the onboarding
    if (!user) {
      return redirectToOnboarding();
    }

    const organization = await getCurrentOrganization(
      user.id,
      currentOrganizationId,
    );

    const headers = new Headers();

    // if the organization is found, save the ID in a cookie
    // so that we can fetch it on the next request
    if (organization) {
      const organizationIdCookie = await serializeOrganizationIdCookie(
        organization.id,
      );

      headers.append('Set-Cookie', organizationIdCookie);
    }

    const csrfSecretCookieValue = await parseCsrfSecretCookie(request);

    const { token: csrfToken, secret } = await createCsrfCookie(
      csrfSecretCookieValue,
    );

    headers.append('Set-Cookie', await serializeCsrfSecretCookie(secret));

    const ui = await getUIStateCookies(request);

    return json(
      {
        csrfToken,
        organization,
        session: metadata,
        user,
        ui,
      },
      {
        headers,
      },
    );
  } catch (e) {
    // to avoid infinite redirects, we redirect to the home page
    return redirectToHomePage();
  }
};

async function getUserAuthMetadata(session: Maybe<string>) {
  const user = await getLoggedInUser(session);

  return getUserInfoById(user.uid);
}

function redirectToOnboarding() {
  return redirect(configuration.paths.onboarding);
}

function redirectToHomePage() {
  return redirect('/');
}

function redirectToLogin({
  returnUrl,
  needsEmailVerification,
  signOut,
}: {
  returnUrl: string;
  needsEmailVerification?: boolean;
  signOut?: boolean;
}) {
  const redirectPath = configuration.paths.signIn;
  const cleanReturnUrl = getPathFromReturnUrl(returnUrl);

  const queryParams = new URLSearchParams({
    returnUrl: cleanReturnUrl ?? '/',
    needsEmailVerification: needsEmailVerification ? 'true' : 'false',
    signOut: signOut ? 'true' : 'false',
  });

  // we build the sign in URL
  // appending the "returnUrl" query parameter so that we can redirect the user
  // straight to where they were headed
  const destination = `${redirectPath}?${queryParams}`;

  return redirect(destination, {
    status: HttpStatusCode.SeeOther,
  });
}

export default loadAppDataServer;

function getPathFromReturnUrl(returnUrl: string) {
  try {
    return new URL(returnUrl).pathname;
  } catch (e) {
    return returnUrl.split('?')[0];
  }
}
