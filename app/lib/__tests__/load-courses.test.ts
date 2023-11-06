import { CourseModel } from '../courses/types/course-model';
import { CourseRepositoryModel } from '../courses/types/course-repository-model';
import loadCourses from '../courses/usecases/load-courses';
import courses from "./fixtures/courses.json";

// This is an example to see how to model the

const repository: CourseRepositoryModel = {
  useLoadCourses: () => ({
    status: 'success',
    hasEmitted:true,
    isComplete: true,
    data: courses,
    error: undefined,
    firstValuePromise: Promise.resolve(),
  }),
  useLoadLessons: () => ({}) as any,
};

describe("Should load the courses", () => {
  it("Should load the courses", () => {
    const courses = loadCourses({repository});
    expect(courses.data.length).toBe(1);
  })
})