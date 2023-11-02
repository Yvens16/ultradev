import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import { Link } from '@remix-run/react';

import NavigationMenuItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

const links = {
  SignIn: {
    label: 'Sign In',
    path: '/auth/sign-in',
  },
  Pricing: {
    label: 'Pricing',
    path: '/pricing',
  },
  About: {
    label: 'About',
    path: '/about',
  },
  FAQ: {
    label: 'FAQ',
    path: '/faq',
  },
};

const SiteNavigation = () => {
  return (
    <>
      <div className={'hidden items-center space-x-1 lg:flex'}>
        <NavigationMenu>
          <NavigationMenuItem
            className={'flex lg:hidden'}
            link={links.SignIn}
          />

          <NavigationMenuItem link={links.About} />
          <NavigationMenuItem link={links.Pricing} />
          <NavigationMenuItem link={links.FAQ} />
        </NavigationMenu>
      </div>

      <div className={'ml-4 flex items-center lg:hidden'}>
        <MobileDropdown />
      </div>
    </>
  );
};

function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bars3Icon className={'h-9'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(links).map((item) => {
          const className = 'flex w-full h-full items-center';

          return (
            <DropdownMenuItem key={item.path}>
              <Link className={className} to={item.path}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SiteNavigation;