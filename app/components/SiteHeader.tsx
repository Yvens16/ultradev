import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import SiteNavigation from './SiteNavigation';
import ProfileDropdown from './ProfileDropdown';
import DarkModeToggle from '~/components/DarkModeToggle';

import configuration from '~/configuration';
import useUserSession from '~/core/hooks/use-user-session';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const auth = useAuth();
  const userSession = useUserSession();

  const signOutRequested = useCallback(() => {
    return auth.signOut();
  }, [auth]);

  return (
    <div className={`w-full py-4 ${fixed ? fixedClassName : ''}`}>
      <Container>
        <div className="flex flex-row items-center">
          <div className={'flex items-center space-x-4 lg:space-x-8'}>
            <Logo />
            <SiteNavigation />
          </div>

          <div className={'flex flex-1 items-center justify-end space-x-4'}>
            <div className={'flex items-center'}>
              <If
                condition={
                  configuration.enableThemeSwitcher && !userSession?.auth
                }
              >
                <DarkModeToggle />
              </If>
            </div>

            <Transition
              appear
              show
              enter="transition-opacity duration-500"
              enterFrom="opacity-50"
              enterTo="opacity-100"
            >
              <If condition={userSession?.auth} fallback={<AuthButtons />}>
                {(user) => (
                  <ProfileDropdown
                    user={user}
                    signOutRequested={signOutRequested}
                  />
                )}
              </If>
            </Transition>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  return (
    <div className={'hidden space-x-2 lg:flex'}>
      <Button round color={'transparent'} href={configuration.paths.signIn}>
        <span>Sign In</span>
      </Button>

      <Button round color={'secondary'} href={configuration.paths.signUp}>
        <span className={'flex items-center space-x-2'}>
          <span>Sign Up</span>
          <ArrowRightIcon className={'h-4'} />
        </span>
      </Button>
    </div>
  );
}

export default SiteHeader;
