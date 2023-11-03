import LessonDomain from "@domain/entity/LessonDomain";
import UserDomain from "@domain/entity/UserDomain";

export default interface LessonManagementUsecase {
  getLessons(CourseId: number): Promise<LessonDomain[]>;
  getLesson(LessonId: number): Promise<LessonDomain>;
  canAccessFullOrPreview({ lesson, user }: { lesson: LessonDomain, user?: UserDomain }): LessonDomain | string;
}