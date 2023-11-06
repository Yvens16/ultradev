import { CourseRepositoryModel } from "../types/course-repository-model";
import type { CollectionReference } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {COURSES_COLLECTION, LESSONS_COLLECTION} from '~/lib/firestore-collections';

import { CourseModel } from "../types/course-model";
import { LessonModel } from "~/lib/lessons/types/lesson-model";
export default function courseRepository(): CourseRepositoryModel {
  const firestore = useFirestore();

  return {
    useLoadCourses: () => {
      const coursesCollection = collection(
        firestore,
        COURSES_COLLECTION,
      ) as CollectionReference<CourseModel>;
      return useFirestoreCollectionData(coursesCollection, {});
    },
    useLoadLessons: () => {
      const lessonsCollection = collection(
        firestore,
        LESSONS_COLLECTION,
      ) as CollectionReference<LessonModel>;
      
      return useFirestoreCollectionData(lessonsCollection, {});
    }
  }
}