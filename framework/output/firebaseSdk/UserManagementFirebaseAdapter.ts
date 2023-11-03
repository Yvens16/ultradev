import UserManagementOutputPort from "../../../application/port/output/UserManagementOutputPort";
import UserDomain from "../../../domain/entity/UserDomain";

export default class UserManagementFirebaseAdapter implements UserManagementOutputPort {
  private firebaseClient: any;
  
  constructor({firebaseClient}: {firebaseClient: any}) {
    this.firebaseClient = firebaseClient;
  };

  persistUser(): UserDomain {
    throw new Error("Method not implemented.");
  }

  getUser(): UserDomain {
    throw new Error("Method not implemented.");
  }

}