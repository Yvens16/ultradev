import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Trans } from 'react-i18next';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

import DashboardDemo from '~/components/dashboard/DashboardDemo';
import ClientOnly from '~/core/ui/ClientOnly';
import AppHeader from '~/components/AppHeader';
import AppContainer from '~/components/AppContainer';

export const meta: MetaFunction = () => {
  return {
    title: 'Dashboard',
  };
};

function DashboardPage() {
  return (
    <>
      <AppHeader Icon={Squares2X2Icon}>
        <Trans i18nKey={'common:dashboardTabLabel'} />
      </AppHeader>

      <AppContainer>
        <ClientOnly>
          <DashboardDemo />
        </ClientOnly>
      </AppContainer>
    </>
  );
}

export default DashboardPage;
