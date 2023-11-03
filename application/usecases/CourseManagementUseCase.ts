import CourseDomain from "@domain/entity/CourseDomain";
import LessonDomain from "@domain/entity/LessonDomain";

import Id from "@domain/value_object/Id";

export default interface CourseManagementUseCase {
  getCourse({id}: {id: Id}): CourseDomain;
  getCourses(): CourseDomain[];
  getLessons({courseId}: {courseId: Id}): LessonDomain[];
}