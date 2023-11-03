
interface ICourseMetaDataParams {
  title: string;
  description: string;
  createdAt: Date;
}

export default class CourseMetaData {
  private title: string;
  private description: string;
  private createdAt: Date;

  constructor({ title, description, createdAt }: ICourseMetaDataParams) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
};