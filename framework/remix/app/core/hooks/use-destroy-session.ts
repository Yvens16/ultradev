import { useFetcher } from '@remix-run/react';
import { useCallback } from 'react';

function useDestroySession() {
  const fetcher = useFetcher();

  return useCallback(() => {
    return fetcher.submit(
      {},
      {
        method: 'post',
        action: '/auth/sign-out',
      }
    );
  }, [fetcher]);
}

export default useDestroySession;
