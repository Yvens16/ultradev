import UserDomain from "@domain/entity/UserDomain";
import UserManagementUsecase from "@application/usecases/UserManagementUsecase";

export default class UserManagementInputport implements UserManagementUsecase {
  signUpUser(): UserDomain {
    throw new Error("Method not implemented.");
  }
  signInUser(): UserDomain {
    throw new Error("Method not implemented.");
  }
  signOutUser(): void {
    throw new Error("Method not implemented.");
  }
}