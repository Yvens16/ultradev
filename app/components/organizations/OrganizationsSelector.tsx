import { useState } from 'react';
import { Trans } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from '@remix-run/react';

import type Organization from '~/lib/organizations/types/organization';
import useFetchUserOrganizations from '~/lib/organizations/hooks/use-fetch-user-organizations';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
  SelectGroup,
  SelectAction,
  SelectLabel,
  SelectValue,
} from '~/core/ui/Select';

import If from '~/core/ui/If';

import CreateOrganizationModal from './CreateOrganizationModal';
import ClientOnly from '~/core/ui/ClientOnly';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

const OrganizationsSelector: React.FCC<{ userId: string }> = ({ userId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const organization = useCurrentOrganization();

  const value = getPath(organization?.id as string, location.pathname);

  return (
    <>
      <Select
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
        value={value}
        onValueChange={navigate}
      >
        <SelectTrigger data-cy={'organization-selector'}>
          <span
            className={'max-w-[5rem] text-sm lg:max-w-[12rem] lg:text-base'}
          >
            <OrganizationItem organization={organization} />

            <span hidden>
              <SelectValue />
            </span>
          </span>
        </SelectTrigger>

        <SelectContent position={'popper'} collisionPadding={{ top: 100 }}>
          <SelectGroup>
            <SelectLabel>Your Organizations</SelectLabel>

            <SelectSeparator />

            <ClientOnly>
              <OrganizationsOptions
                organization={organization}
                userId={userId}
              />
            </ClientOnly>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectAction
              onClick={() => {
                setIsSelectOpen(false);
                setIsOrganizationModalOpen(true);
              }}
            >
              <span
                data-cy={'create-organization-button'}
                className={'flex flex-row items-center space-x-2 truncate'}
              >
                <PlusCircleIcon className={'h-5'} />

                <span>
                  <Trans
                    i18nKey={'organization:createOrganizationDropdownLabel'}
                  />
                </span>
              </span>
            </SelectAction>
          </SelectGroup>
        </SelectContent>
      </Select>

      <CreateOrganizationModal
        setIsOpen={setIsOrganizationModalOpen}
        isOpen={isOrganizationModalOpen}
        onCreate={(id) => {
          navigate(getPath(id, location.pathname));
        }}
      />
    </>
  );
};

function OrganizationsOptions({
  userId,
  organization,
}: React.PropsWithChildren<{
  userId: string;
  organization: Maybe<WithId<Organization>>;
}>) {
  const location = useLocation();
  const { data, status } = useFetchUserOrganizations(userId);
  const isLoading = status === 'loading';

  if (isLoading && organization) {
    const value = getPath(organization.id, location.pathname);

    return (
      <SelectItem value={value} key={value}>
        <OrganizationItem organization={organization} />
      </SelectItem>
    );
  }

  const organizations = data ?? [];

  return (
    <>
      {organizations.map((item) => {
        const value = getPath(item.id, location.pathname);

        return (
          <SelectItem value={value} key={value}>
            <OrganizationItem organization={item} />
          </SelectItem>
        );
      })}
    </>
  );
}

function OrganizationItem({
  organization,
}: {
  organization: Maybe<Organization>;
}) {
  const imageSize = 18;

  if (!organization) {
    return null;
  }

  const { logoURL, name } = organization;

  return (
    <span
      data-cy={'organization-selector-item'}
      className={`flex max-w-[12rem] items-center space-x-2`}
    >
      <If condition={logoURL}>
        <span className={'flex items-center'}>
          <img
            decoding={'async'}
            loading={'lazy'}
            style={{
              width: imageSize,
              height: imageSize,
            }}
            width={imageSize}
            height={imageSize}
            alt={`${name} Logo`}
            className={'object-contain'}
            src={logoURL as string}
          />
        </span>
      </If>

      <span className={'w-auto truncate text-sm font-medium'}>{name}</span>
    </span>
  );
}

export default OrganizationsSelector;

function getPath(organizationId: string, path: string) {
  return ['', organizationId, path.slice(1, path.length)].join('/');
}
