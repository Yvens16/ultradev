import { Role } from "../domainType";

interface IUserIdentityParams {
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export default class UserIdentity {
  private firstname: string;
  private lastname: string;
  private email: string;
  private role: Role;
  private createdAt: Date;

  constructor({ firstname, lastname, email, role, createdAt }: IUserIdentityParams) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getFirstname(): string {
    return this.firstname;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): Role {
    return this.role;
  }
}