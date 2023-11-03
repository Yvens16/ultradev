import { NavLink } from '@remix-run/react';
import { Trans } from 'react-i18next';
import classNames from 'classnames';
import type { NavLinkProps } from '@remix-run/react';

interface LinkModel {
  path: string;
  label: string;
}

const NavigationMenuItem: React.FCC<{
  link: LinkModel;
  disabled?: boolean;
  className?: string;
  end?: NavLinkProps['end'];
  prefetch?: NavLinkProps['prefetch'];
}> = ({ link, className, end, disabled, prefetch }) => {
  const label = link.label;

  return (
    <NavLink
      end={end}
      className={(props) => {
        return classNames(`NavigationItem`, className, {
          [`NavigationItemActive`]: props.isActive,
          [`NavigationItemNotActive`]: !props.isActive,
        });
      }}
      aria-disabled={disabled}
      to={disabled ? '' : link.path}
      prefetch={prefetch ?? 'intent'}
    >
      <Trans i18nKey={label} defaults={label} />
    </NavLink>
  );
};

export default NavigationMenuItem;
