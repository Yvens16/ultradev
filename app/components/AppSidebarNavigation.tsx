import { NavLink } from '@remix-run/react';
import { Trans } from 'react-i18next';
import classNames from 'classnames';

import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import If from '~/core/ui/If';

import NAVIGATION_CONFIG from '../navigation.config';

function AppSidebarNavigation({
  collapsed,
}: React.PropsWithChildren<{
  collapsed: boolean;
}>) {
  const iconClassName = classNames('AppSidebarItemIcon', {
    'h-6': !collapsed,
    'h-7': collapsed,
  });

  return (
    <div className={'flex flex-col space-y-1.5'}>
      {NAVIGATION_CONFIG.items.map((item) => {
        const Label = <Trans i18nKey={item.label} defaults={item.label} />;

        return (
          <AppSidebarItem key={item.path} href={item.path}>
            <If
              condition={collapsed}
              fallback={<item.Icon className={iconClassName} />}
            >
              <Tooltip>
                <TooltipTrigger>
                  <item.Icon className={iconClassName} />
                </TooltipTrigger>

                <TooltipContent side={'right'} sideOffset={20}>
                  {Label}
                </TooltipContent>
              </Tooltip>
            </If>

            <span>{Label}</span>
          </AppSidebarItem>
        );
      })}
    </div>
  );
}

function AppSidebarItem({
  children,
  href,
}: React.PropsWithChildren<{
  href: string;
}>) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return classNames(`AppSidebarItem`, {
          AppSidebarItemActive: isActive,
          AppSidebarItemNotActive: !isActive,
        });
      }}
    >
      {children}
    </NavLink>
  );
}

export default AppSidebarNavigation;
