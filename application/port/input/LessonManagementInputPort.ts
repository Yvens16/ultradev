import LessonManagementUsecase from "@application/usecases/LessonManagementUseCase";
import LessonDomain from "@domain/entity/LessonDomain";
import UserDomain from "@domain/entity/UserDomain";
import LessonManagementOutputPort from "../output/LessonManagementOutputPort";

export default class LessonManagementInputPort implements LessonManagementUsecase {

  constructor(private lessonOutputPort: LessonManagementOutputPort){
    this.lessonOutputPort = lessonOutputPort;
  }

  async getLessons(CourseId: number): Promise<LessonDomain[]> {
    const lessons = await this.lessonOutputPort.getLessons(CourseId);
    return lessons;
  }

  async getLesson(LessonId: number): Promise<LessonDomain> {
    throw new Error("Method not implemented.");
  }

  canAccessFullOrPreview({ lesson, user }: { lesson: LessonDomain; user?: UserDomain; }): LessonDomain | string {
    if(!user && lesson.getOrder() > 3) {
      return lesson.getUrlDetails().getVideoPreviewUrl();
    };
    return lesson;
  }

}