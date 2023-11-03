import Id from "../value_object/Id";
import UserIdentity from "../value_object/UserIdentity";

// UserDomain constructor interface
interface IUserDomainParams {
  id: Id;
  isNewAccount: boolean;
  organizationId: string;
  plan: string;
  userIdentity: UserIdentity;
}

export default class UserDomain {
  private id: Id;
  private userIdentity: UserIdentity;
  private isNewAccount: boolean;
  private organizationId: string;
  private plan: string;


  constructor(
    { id,
      isNewAccount,
      organizationId,
      userIdentity,
      plan }: IUserDomainParams
  ) {
    this.id = id;
    this.isNewAccount = isNewAccount;
    this.organizationId = organizationId;
    this.plan = plan;
    this.userIdentity = userIdentity;
  }

  public getUserIdentity(): UserIdentity {
    return this.userIdentity;
  };

  public getId(): Id {
    return this.id;
  }

  public getIsNewAccount(): boolean {
    return this.isNewAccount;
  }

  public getorganizationId(): string {
    return this.organizationId;
  }

  public getPlan(): string {
    return this.plan;
  }

}

