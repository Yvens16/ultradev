import { v4 as uuidv4 } from 'uuid';

export default class Id {
  private id: string;

  constructor(id?: string) {
    this.id = id ? id : uuidv4();
  }

  public getId(): string {
    return this.id;
  }

}