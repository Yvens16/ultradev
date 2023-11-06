import { ObservableStatus } from "reactfire";
import { CourseModel } from "../types/course-model";
import { CourseRepositoryModel } from "../types/course-repository-model";


export default function loadCourses({ repository }: { repository: CourseRepositoryModel }): ObservableStatus<CourseModel[]> {
  const courses = repository.useLoadCourses();
  // return  {...courses, data: courses.data?.map((course: CourseModel) => ({...course, creator: "YVENS"}))};;
  return courses;
}