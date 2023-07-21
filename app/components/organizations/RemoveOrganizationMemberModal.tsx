import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import toaster from 'react-hot-toast';
import useRemoveMemberRequest from '~/lib/organizations/hooks/use-remove-member';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';

import type { SerializedUserAuthData } from '~/core/session/types/user-session';

const Heading = <Trans i18nKey="organization:removeMemberModalHeading" />;

const RemoveOrganizationMemberModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  member: SerializedUserAuthData;
}> = ({ isOpen, setIsOpen, member }) => {
  const [removeMemberRequest, { loading }] = useRemoveMemberRequest(member.uid);

  const onUserRemoved = useCallback(async () => {
    await toaster.promise(removeMemberRequest(), {
      success: t(`removeMemberSuccessMessage`),
      error: t(`removeMemberErrorMessage`),
      loading: t(`removeMemberLoadingMessage`),
    });

    setIsOpen(false);
  }, [removeMemberRequest, setIsOpen]);

  return (
    <Modal heading={Heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-4'}>
        <div>
          <p>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
          </p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            data-cy={'confirm-remove-member'}
            variant={'flat'}
            color={'danger'}
            onClick={onUserRemoved}
            loading={loading}
          >
            <Trans i18nKey={'organization:removeMemberSubmitLabel'} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveOrganizationMemberModal;
