import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

/**
 * @name useIsSubscriptionActive
 * @description Returns whether the organization is on any paid
 * subscription, regardless of plan.
 */
function useIsSubscriptionActive() {
  const organization = useCurrentOrganization();
  const status = organization?.subscription?.status;

  if (!status) {
    return false;
  }

  return ['trialing', 'active'].includes(status);
}

export default useIsSubscriptionActive;
