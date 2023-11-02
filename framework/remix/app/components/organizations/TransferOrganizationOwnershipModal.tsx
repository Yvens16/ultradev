import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import toaster from 'react-hot-toast';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';
import If from '~/core/ui/If';
import type { SerializedUserAuthData } from '~/core/session/types/user-session';

import useTransferOrganizationOwnership from '~/lib/organizations/hooks/use-transfer-organization-ownership';

const Heading = <Trans i18nKey="organization:transferOwnership" />;

const TransferOrganizationOwnershipModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: SerializedUserAuthData;
}> = ({ isOpen, setIsOpen, member }) => {
  const targetMemberDisplayName = member.displayName ?? member.email;
  const targetMemberId = member.uid;
  const { t } = useTranslation();

  const [transferOrganizationOwnership, transferOrganizationOwnershipState] =
    useTransferOrganizationOwnership();

  const loading = transferOrganizationOwnershipState.loading;

  const onConfirmTransferOwnership = useCallback(async () => {
    const promise = transferOrganizationOwnership({ userId: targetMemberId });

    await toaster.promise(promise, {
      loading: t('organization:transferringOwnership'),
      success: t('organization:transferOwnershipSuccess'),
      error: t('organization:transferOwnershipError'),
    });

    setIsOpen(false);
  }, [setIsOpen, t, targetMemberId, transferOrganizationOwnership]);

  return (
    <Modal heading={Heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2'}>
          <p className={'text-sm'}>
            <Trans
              i18nKey={'organization:transferOwnershipDisclaimer'}
              values={{
                member: targetMemberDisplayName,
              }}
              components={{ b: <b /> }}
            />
          </p>

          <p className={'text-sm'}>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
          </p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            data-cy={'confirm-transfer-ownership-button'}
            variant={'flat'}
            color={'danger'}
            onClick={onConfirmTransferOwnership}
            loading={loading}
          >
            <If
              condition={loading}
              fallback={<Trans i18nKey={'organization:transferOwnership'} />}
            >
              <Trans i18nKey={'organization:transferringOwnership'} />
            </If>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferOrganizationOwnershipModal;
