import React from 'react';
import { Outlet } from '@remix-run/react';
import { Trans } from 'react-i18next';

import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import AppHeader from '~/components/AppHeader';
import AppContainer from '~/components/AppContainer';

const links = [
  {
    path: '/settings/profile',
    label: 'common:profileSettingsTabLabel',
  },
  {
    path: '/settings/organization',
    label: 'common:organizationSettingsTabLabel',
  },
  {
    path: '/settings/subscription',
    label: 'common:subscriptionSettingsTabLabel',
  },
];

function SettingsLayout() {
  return (
    <>
      <AppHeader>
        <Trans i18nKey={'common:settingsTabLabel'} />
      </AppHeader>

      <AppContainer>
        <NavigationMenu bordered>
          {links.map((link) => (
            <NavigationItem link={link} key={link.path} />
          ))}
        </NavigationMenu>

        <div
          className={`flex h-full flex-col space-y-4 md:space-y-0 lg:mt-6 lg:flex-row lg:space-x-8`}
        >
          <Outlet />
        </div>
      </AppContainer>
    </>
  );
}

export default SettingsLayout;
