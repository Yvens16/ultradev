import UserDomain from "@domain/entity/UserDomain";

export default interface UserManagementUsecase {
  signUpUser(): UserDomain;
  signInUser(): UserDomain;
  signOutUser(): void;
}

// deleteUser(): void;
// updateUser(): void;

/**
 * 
 * signUpUser():

Success:
User ID: A unique identifier for the newly created user.
User Profile: The basic profile information of the user such as name, email, etc.
Authentication Token: A token that can be used for authenticated requests.
Failure:
Error Message: A message indicating why the sign-up failed, e.g., email already in use, weak password, etc.
Error Code: A code representing the error for easier handling on the client side.
signInUser():

Success:
User ID: The unique identifier of the user.
User Profile: Basic profile information.
Authentication Token: A token for authenticated requests.
Failure:
Error Message: A message indicating why the sign-in failed, e.g., incorrect password, user not found, etc.
Error Code: A code representing the error.
signOutUser():

Success:
Confirmation Message: A message confirming successful sign-out.
Failure:
Error Message: A message indicating why the sign-out failed.
Error Code: A code representing the error.
 * 
 */