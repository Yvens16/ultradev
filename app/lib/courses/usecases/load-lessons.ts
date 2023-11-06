import { ObservableStatus } from "reactfire";
import { CourseRepositoryModel } from "../types/course-repository-model";
import { LessonModel } from "~/lib/lessons/types/lesson-model";

// To use from real component
// import useIsSubscriptionActive from "~/lib/organizations/hooks/use-is-subscription-active";

// This is an example to see how to model the tests

export function canUserOnlySeePreview({ lesson, isSubscriptionActive }: { lesson: LessonModel, isSubscriptionActive: boolean }) {
  if (lesson.seqNo > 3 && isSubscriptionActive === false) {
    return true;
  } 
  return false;
}

export default function loadLessons({ repository, callback, isSubscriptionActive }: { repository: CourseRepositoryModel, callback?: any, isSubscriptionActive: boolean }): ObservableStatus<LessonModel[]> {
  const lessons = repository.useLoadLessons();
  return {
    ...lessons,
    data: lessons.data?.map((lesson: LessonModel) => ({ ...lesson, isPreviewOnly: callback({ lesson, isSubscriptionActive: isSubscriptionActive }) })) };
}