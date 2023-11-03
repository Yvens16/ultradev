import LessonManagementOutputPort from "@application/port/output/LessonManagementOutputPort";
import LessonDomain from "@domain/entity/LessonDomain";
import UserDomain from "@domain/entity/UserDomain";


export default class LessonManagementAdapter implements LessonManagementOutputPort {
  private firebaseClient: any;

  constructor({firebaseClient}: {firebaseClient: any}) {
    this.firebaseClient = firebaseClient;
  };

  async getLessons(CourseId: number): Promise<LessonDomain[]> {
    const lessons = await this.firebaseClient.getLessons(CourseId);
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