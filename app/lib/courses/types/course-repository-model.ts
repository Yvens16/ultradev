import { CourseModel } from "./course-model";
import { ObservableStatus } from "reactfire";
import { LessonModel } from "~/lib/lessons/types/lesson-model";

export interface CourseRepositoryModel {
  useLoadCourses(): ObservableStatus<CourseModel[]>;
  useLoadLessons(): ObservableStatus<LessonModel[]>;
}