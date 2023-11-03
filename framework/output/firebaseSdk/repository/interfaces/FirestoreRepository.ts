export default interface FirestoreRepository {
  fetchData(): <T>(path:string) => Promise<T | any>;
  saveData(): <T>(path:string, data: any) => Promise<T | any>;
  updateData(): <T>(path:string, data: any) => Promise<T |any>;
  deleteData(): <T>(path:string) => Promise<T | any>;
}