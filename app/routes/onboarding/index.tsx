import { useCallback, useState } from 'react';
import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';

import Logo from '~/core/ui/Logo';
import If from '~/core/ui/If';

import type { OrganizationInfoStepData } from '~/components/onboarding/OrganizationInfoStep';
import { OrganizationInfoStep } from '~/components/onboarding/OrganizationInfoStep';
import OnboardingIllustration from '~/components/onboarding/OnboardingIllustration';
import CompleteOnboardingStep from '~/components/onboarding/CompleteOnboardingStep';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import completeOnboarding from '~/lib/server/onboarding/complete-onboarding';

import getLoggedInUser from '~/core/firebase/admin/auth/get-logged-in-user';
import FirebaseAppShell from '~/core/firebase/components/FirebaseAppShell';
import FirebaseAuthProvider from '~/core/firebase/components/FirebaseAuthProvider';
import getUserInfoById from '~/core/firebase/admin/auth/get-user-info-by-id';
import { throwBadRequestException } from '~/core/http-exceptions';

import configuration from '~/configuration';
import firebaseConfig from '../../firebase.config';
import { serializeOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import withMethodsGuard from '~/core/middleware/with-methods-guard';
import UserSessionContext from '~/core/session/contexts/user-session';
import type UserSession from '~/core/session/types/user-session';

interface Data {
  organization: string;
}

export const meta: MetaFunction = () => {
  return {
    title: `Onboarding - ${configuration.site.siteName}`,
  };
};

const Onboarding = () => {
  const data = useLoaderData() as { userSession: UserSession };

  const [currentStep, setCurrentStep] = useState(0);
  const [userSession, setUserSession] = useState<Maybe<UserSession>>(
    data.userSession
  );
  const [formData, setFormData] = useState<Data>();

  const onFirstStepSubmitted = useCallback(
    (organizationInfo: OrganizationInfoStepData) => {
      setFormData({
        organization: organizationInfo.organization,
      });

      setCurrentStep(1);
    },
    []
  );

  return (
    <FirebaseAppShell config={firebaseConfig}>
      <FirebaseAuthProvider
        useEmulator={firebaseConfig.emulator}
        userSession={userSession}
        setUserSession={setUserSession}
      >
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
          <div className={'flex flex-1 flex-col dark:bg-black-500'}>
            <div
              className={'flex divide-x divide-gray-100 dark:divide-black-300'}
            >
              <div
                className={
                  'flex h-screen flex-1 flex-col items-center justify-center' +
                  ' w-full lg:w-6/12'
                }
              >
                <div className={'absolute top-24 flex'}>
                  <Logo href={'/onboarding'} />
                </div>

                <div className={'w-9/12'}>
                  <If condition={currentStep === 0}>
                    <OrganizationInfoStep onSubmit={onFirstStepSubmitted} />
                  </If>

                  <If condition={currentStep === 1 && formData}>
                    {(formData) => <CompleteOnboardingStep data={formData} />}
                  </If>
                </div>
              </div>

              <div
                className={
                  'hidden w-6/12 flex-1 items-center bg-gray-50' +
                  ' justify-center dark:bg-black-400 lg:flex'
                }
              >
                <div>
                  <OnboardingIllustration />
                </div>
              </div>
            </div>
          </div>
        </UserSessionContext.Provider>
      </FirebaseAuthProvider>
    </FirebaseAppShell>
  );
};

export default Onboarding;

export async function action(args: ActionArgs) {
  const req = args.request;
  const formData = await req.formData();
  const body = JSON.parse(formData.get('data') as string);
  const parsedBody = await getBodySchema().safeParseAsync(body);

  if (!parsedBody.success) {
    return throwBadRequestException();
  }

  await withMethodsGuard(req, ['POST']);

  const { parseSessionIdCookie } = await import(
    `~/lib/server/cookies/session.cookie`
  );
  const sessionId = await parseSessionIdCookie(req);
  const user = await getLoggedInUser(sessionId);
  const userId = user.uid;
  const organizationName = parsedBody.data.organization;

  const data = {
    userId,
    organizationName,
  };

  const organizationId = await completeOnboarding(data);

  const headers = new Headers({
    'Set-Cookie': await serializeOrganizationIdCookie(organizationId),
  });

  return redirect(configuration.paths.appHome, {
    headers,
  });
}

export async function loader(args: LoaderArgs) {
  const { parseSessionIdCookie } = await import(
    `~/lib/server/cookies/session.cookie`
  );
  const sessionId = await parseSessionIdCookie(args.request);
  const user = await getLoggedInUser(sessionId).catch(() => undefined);

  if (!user) {
    return redirectToSignIn();
  }

  const userId = user.uid;

  const [userInfo, userData] = await Promise.all([
    getUserInfoById(userId),
    getUserData(userId),
  ]);

  // if we cannot find the user's Firestore record
  // the user should go to the onboarding flow
  // so that the record wil be created after the end of the flow
  if (!userData) {
    return {
      userSession: {
        auth: userInfo,
      },
    };
  }

  const organization = await getCurrentOrganization(user.uid);
  const onboarded = userInfo?.customClaims?.onboarded;

  // there are two cases when we redirect the user to the onboarding
  // 1. if they have not been onboarded yet
  // 2. if they end up with 0 organizations (for example, if they get removed)
  //
  // NB: you should remove this if you want to
  // allow organization-less users within the application
  if (onboarded && organization) {
    return redirectToAppHome();
  }

  return json({
    userSession: {
      auth: userInfo,
      data: userData,
    },
  });
}

function redirectToSignIn() {
  return redirect(configuration.paths.signIn);
}

function redirectToAppHome() {
  return redirect(configuration.paths.appHome);
}

/**
 * @name getUserData
 * @description Fetch User Firestore data decorated with its ID field
 * @param userId
 */
async function getUserData(userId: string) {
  const { getUserRefById } = await import('~/lib/server/queries');

  const ref = await getUserRefById(userId);
  const data = ref.data();

  if (data) {
    return {
      ...data,
      id: ref.id,
    };
  }
}

function getBodySchema() {
  return z.object({
    organization: z.string(),
  });
}
