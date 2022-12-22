import React, { useMemo } from 'react';
import { EmailAuthProvider } from 'firebase/auth';
import { useUser } from 'reactfire';

import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationMenu';

const links = {
  General: {
    path: '/settings/profile',
    label: 'profile:generalTab',
  },
  Authentication: {
    path: '/settings/profile/authentication',
    label: 'profile:authenticationTab',
  },
  Email: {
    path: '/settings/profile/email',
    label: 'profile:emailTab',
  },
  Password: {
    path: '/settings/profile/password',
    label: 'profile:passwordTab',
  },
};

const ProfileSettingsTabs = () => {
  const { data: user } = useUser();

  // user can only edit email and password
  // if they signed up with the EmailAuthProvider provider
  const canEditEmailAndPassword = useMemo(() => {
    const emailProviderId = EmailAuthProvider.PROVIDER_ID;

    if (!user) {
      return false;
    }

    return user.providerData.some((item) => {
      return item.providerId === emailProviderId;
    });
  }, [user]);

  const itemClassName = `flex justify-center md:justify-start items-center w-full`;

  return (
    <>
      <div className={'hidden w-full max-w-[12rem] md:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem end className={itemClassName} link={links.General} />

          <NavigationItem
            className={itemClassName}
            link={links.Authentication}
          />

          <NavigationItem
            className={itemClassName}
            disabled={!canEditEmailAndPassword}
            link={links.Email}
          />

          <NavigationItem
            className={itemClassName}
            disabled={!canEditEmailAndPassword}
            link={links.Password}
          />
        </NavigationMenu>
      </div>

      <div className={'block w-full md:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default ProfileSettingsTabs;
