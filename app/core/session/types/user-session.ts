import type { MultiFactorInfo, User, UserInfo } from 'firebase/auth';
import type UserData from '~/core/session/types/user-data';

/**
 * This interface combines the user's metadata from
 * Firebase Auth and the user's record in Firestore
 */
export default interface UserSession {
  auth: Maybe<AuthUserData>;
  data: Maybe<UserData>;
}

interface AuthUserData extends User {
  customClaims?: Record<string, string>;
  tenantId: string | null;
  providerData: UserInfo[];
  multiFactor: MultiFactorInfo[];
}
