import LessonDomain from "@domain/entity/LessonDomain";

export default interface LessonManagementOutputPort {
  getLessons(CourseId: number): Promise<LessonDomain[]>;
  getLesson(LessonId: number): Promise<LessonDomain>;
}