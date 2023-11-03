import UserDomain from "@domain/entity/UserDomain";

export default interface UserManagementOutputPort {
  persistUser(): UserDomain;
  getUser(): UserDomain;
};