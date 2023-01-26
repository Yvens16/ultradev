import React from 'react';
import { useAuth } from 'reactfire';

import useUserSession from '~/core/hooks/use-user-session';
import ProfileDropdown from '~/components/ProfileDropdown';
import MobileNavigation from '~/components/MobileNavigation';

import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';
import AppContainer from '~/components/AppContainer';
import OrganizationsSelector from '~/components/organizations/OrganizationsSelector';

import HeaderSubscriptionStatusBadge
  from '~/components/subscriptions/HeaderSubscriptionStatusBadge';

const AppHeader: React.FCC<{
  Icon?: React.ComponentType<{ className: string }>;
}> = ({ children, Icon }) => {
  const userSession = useUserSession();
  const auth = useAuth();

  return (
    <div className="AppHeader">
      <AppContainer>
        <div className={'flex w-full flex-1 justify-between'}>
          <div
            className={
              'flex items-center justify-between space-x-2 lg:space-x-0'
            }
          >
            <div className={'lg:hidden'}>
              <MobileNavigation />
            </div>

            <div className={'flex items-center space-x-2 lg:space-x-4'}>
              <If condition={userSession?.auth?.uid}>
                {(uid) => <OrganizationsSelector userId={uid} />}
              </If>

              <Heading type={5}>
                <span className={'flex items-center space-x-2'}>
                  {Icon && <Icon className={'h-6 dark:text-primary-500'} />}

                  <span className={'font-medium dark:text-white'}>
                    {children}
                  </span>
                </span>
              </Heading>
            </div>
          </div>

          <div className={'flex space-x-4 items-center'}>
            <HeaderSubscriptionStatusBadge />

            <ProfileDropdown
              user={userSession?.auth}
              signOutRequested={() => auth.signOut()}
            />
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default AppHeader;
