/**
 * @description Get the logged in user object using the session cookie
 * @param session
 * @param checkRevoked
 */
export default async function getLoggedInUser(
  session: Maybe<string>,
  checkRevoked = false,
) {
  if (!session) {
    return Promise.reject(`Session ID not found`);
  }

  const { getUserFromSessionCookie } = await import(
    './get-user-from-session-cookie'
  );

  return getUserFromSessionCookie(session, checkRevoked);
}
