import { CourseModel } from '../courses/types/course-model';
import { CourseRepositoryModel } from '../courses/types/course-repository-model';
import loadLessons from '../courses/usecases/load-lessons';
import courses from "./fixtures/courses.json";
import { canUserOnlySeePreview } from "../courses/usecases/load-lessons";
import { LessonModel } from '../lessons/types/lesson-model';

// This is an example to see how to model the


describe("Should load the courses", () => {
  it("Should load the lessons with previewOnly or not", () => {

    const lessonsFromDb = courses.map((course: CourseModel) => course.lessons).flat();

    const repository: CourseRepositoryModel = {
      useLoadLessons: () => ({
        status: 'success',
        hasEmitted: true,
        isComplete: true,
        data: lessonsFromDb,
        error: undefined,
        firstValuePromise: Promise.resolve(),
      }),
      useLoadCourses: () => ({}) as any,
    };
    const lessons = loadLessons({ repository, callback: canUserOnlySeePreview, isSubscriptionActive: false });
    expect(lessons.data[1].isPreviewOnly).toBe(false);
    expect(lessons.data[2].isPreviewOnly).toBe(false);
    expect(lessons.data[3].isPreviewOnly).toBe(true);
    expect(lessons.data[4].isPreviewOnly).toBe(true);
  })

  it("Should not failed with empty lessons", () => {
    const lessonsFromDb: LessonModel[] = [];

    const repository: CourseRepositoryModel = {
      useLoadLessons: () => ({
        status: 'success',
        hasEmitted: true,
        isComplete: true,
        data: lessonsFromDb,
        error: undefined,
        firstValuePromise: Promise.resolve(),
      }),
      useLoadCourses: () => ({}) as any,
    };
    const lessons = loadLessons({ repository, callback: canUserOnlySeePreview, isSubscriptionActive: false });
    expect(lessons.data.length).toBe(0);
  });
})