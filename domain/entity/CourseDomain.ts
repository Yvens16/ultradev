import Id from "../value_object/Id";
import LessonDomain from "./LessonDomain";
import CourseMetaData from "../value_object/CourseMetaData";

interface ICourseDomainParams {
  id: Id;
  courseMetaData: CourseMetaData;
  lessons?: LessonDomain[];
}

export default class CourseDomain {
  private id: Id;
  private courseMetaData: CourseMetaData;
  lessons: LessonDomain[];

  constructor({ id, lessons, courseMetaData }: ICourseDomainParams) {
    this.id = id;
    this.lessons = lessons;
    this.courseMetaData = courseMetaData;
  }

  public getCourseMetaData(): CourseMetaData {
    return this.courseMetaData;
  } ƒ

  public getId(): Id {
    return this.id;
  }


  public getLessons(): LessonDomain[] {
    return this.lessons;
  }
}