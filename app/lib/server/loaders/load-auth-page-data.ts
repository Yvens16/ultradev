import type { LoaderArgs } from '@remix-run/server-runtime';
import { json, redirect } from '@remix-run/node';

import getLoggedInUser from '~/core/firebase/admin/auth/get-logged-in-user';
import createCsrfToken from '~/core/generic/create-csrf-token';

import {
  parseCsrfSecretCookie,
  serializeCsrfSecretCookie,
} from '~/lib/server/cookies/csrf-secret.cookie';

import { parseSessionIdCookie } from '~/lib/server/cookies/session.cookie';

import configuration from '~/configuration';

const loadAuthPageData = async ({ request }: LoaderArgs) => {
  const session = await parseSessionIdCookie(request);
  const searchParams = new URL(request.url).searchParams;

  if (
    searchParams.has('signOut') ||
    searchParams.get('needsEmailVerification') === 'true'
  ) {
    return continueToLoginPage(request);
  }

  try {
    const user = await getLoggedInUser(session);

    if (user) {
      return redirect(configuration.paths.appHome);
    }

    return continueToLoginPage(request);
  } catch (e) {
    return continueToLoginPage(request);
  }
};

async function getCsrfTokenHeaders(existingSecret?: string) {
  const headers = new Headers();
  const { secret, token } = await createCsrfToken(existingSecret);

  headers.append('Set-Cookie', await serializeCsrfSecretCookie(secret));

  return {
    headers,
    token,
  };
}

async function continueToLoginPage(request: Request) {
  const csrfSecretValue = await parseCsrfSecretCookie(request);
  const { headers, token } = await getCsrfTokenHeaders(csrfSecretValue);

  return json(
    {
      csrfToken: token,
    },
    {
      headers,
    }
  );
}

export default loadAuthPageData;
