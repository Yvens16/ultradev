import FirestoreRepository from "./interfaces/FirestoreRepository";

export default class FirebaseRepository implements FirestoreRepository {
  fetchData(): <T>(path: string) => Promise<any> {
    throw new Error("Method not implemented.");
  }
  saveData(): <T>(path: string, data: any) => Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateData(): <T>(path: string, data: any) => Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteData(): <T>(path: string) => Promise<any> {
    throw new Error("Method not implemented.");
  }


}