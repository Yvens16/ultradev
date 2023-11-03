
interface ILessonMetadataConstructor {
  title: string;
  description: string;
  content: string;
  createdAt: Date;
}

export default class LessonMetadata {
  private title: string;
  private description: string;
  private content: string;
  private createdAt: Date;

  constructor({ title, description, content, createdAt }: ILessonMetadataConstructor) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.createdAt = createdAt;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getContent(): string {
    return this.content;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

}