import type { LoaderArgs } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/node';

import { serializeOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import HttpStatusCode from '~/core/generic/http-status-code.enum';
import initializeFirebaseAdminApp from '~/core/firebase/admin/initialize-firebase-admin-app';
import getLoggedInUser from '~/core/firebase/admin/auth/get-logged-in-user';
import { parseSessionIdCookie } from '~/lib/server/cookies/session.cookie';

/**
 * Redirects to the path with the organization id in the cookie
 * Useful to change organization or deep-link to a specific organization
 *
 * /1/dashboard will redirect to /dashboard with the organization id in the cookie
 * /4/settings/organization will redirect to /settings/organization with the organization id in the cookie
 */
export async function loader({ params, request }: LoaderArgs) {
  const segments = params['*']?.split('/') ?? [];
  const organizationId = segments[0];
  const path = segments.slice(1).join('/');

  if (organizationId) {
    await initializeFirebaseAdminApp();

    const session = await parseSessionIdCookie(request);
    const user = await getLoggedInUser(session).catch(() => undefined);

    // if the user is not logged in, redirect to /404
    if (!user) {
      return throwNotFoundError();
    }

    const { getOrganizationById } = await import('~/lib/server/queries');
    const organization = await getOrganizationById(organizationId);

    // if the organization exists, we can continue
    if (organization.exists) {
      const isUserMember = organization.data()?.members[user.uid];

      // if the user is not an organization member, redirect to /404
      if (!isUserMember) {
        return throwNotFoundError();
      }

      const headers = new Headers({
        'Set-Cookie': await serializeOrganizationIdCookie(organizationId),
      });

      return redirect(path, {
        headers,
      });
    }
  }

  throwNotFoundError();
}

function throwNotFoundError() {
  throw new Response(null, { status: HttpStatusCode.NotFound });
}

function OrganizationSplatRoute() {
  return <></>;
}

export default OrganizationSplatRoute;
