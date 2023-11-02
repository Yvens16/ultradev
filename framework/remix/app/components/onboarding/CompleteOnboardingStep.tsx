import { useCallback, useEffect, useRef } from 'react';
import { useSubmit } from '@remix-run/react';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';

interface CompleteOnboardingStepData {
  organization: string;
}

const CompleteOnboardingStep: React.FC<{
  data: CompleteOnboardingStepData;
}> = ({ data }) => {
  const submit = useSubmit();
  const onboardingCompleteRequested = useRef(false);

  const callRequestCallback = useCallback(() => {
    return submit(
      { data: JSON.stringify(data) },
      {
        action: '/onboarding?index',
        method: 'post',
      }
    );
  }, [submit, data]);

  useEffect(() => {
    // React will run the effect twice
    // so we use the ref to prevent it
    if (!onboardingCompleteRequested.current) {
      onboardingCompleteRequested.current = true;
      void callRequestCallback();
    }
  }, [callRequestCallback]);

  return (
    <div className={'flex flex-1 flex-col items-center space-y-8'}>
      <PageLoadingIndicator fullPage={false} displayLogo={false}>
        <span>Getting Started. Please wait...</span>
      </PageLoadingIndicator>
    </div>
  );
};

export default CompleteOnboardingStep;
