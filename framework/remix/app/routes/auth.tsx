import { Outlet } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import loadAuthPageDataServer from '~/lib/server/loaders/load-auth-page-data.server';
import AuthPageShell from '~/components/auth/AuthPageShell';

export const loader = loadAuthPageDataServer;

export const meta: MetaFunction = ({ data }) => {
  return {
    'csrf-token': data?.csrfToken,
  };
};

function AuthLayout() {
  return (
    <AuthPageShell>
      <Outlet />
    </AuthPageShell>
  );
}

export default AuthLayout;
