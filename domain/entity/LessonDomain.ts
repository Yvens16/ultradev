import Id from "../value_object/Id";
import UrlDetails from "../value_object/UrlDetails";
import LessonMetadata from "../value_object/LessonMetadata";

interface ILessonParams {
  id: Id;
  lessonMetadata: LessonMetadata;
  urlDetails: UrlDetails;
  courseId: Id;
  order?: number;
}

export default class LessonDomain {
  private id: Id;
  private lessonMetadata: LessonMetadata;
  private urlDetails: UrlDetails;
  private courseId: Id;
  private order?: number;

  constructor({ id, lessonMetadata, urlDetails, courseId, order }: ILessonParams) {
    this.id = id;
    this.lessonMetadata = lessonMetadata;
    this.urlDetails = urlDetails;
    this.courseId = courseId;
    this.order = order;
  }

  public getLessonMetadata(): LessonMetadata {
    return this.lessonMetadata;
  }

  public getOrder(): number {
    return this.order;
  }

  public getUrlDetails(): UrlDetails {
    return this.urlDetails;
  }

  public getCourseId(): Id {
    return this.courseId;
  };


  public getId(): Id {
    return this.id;
  }
}