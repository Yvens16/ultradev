import { LessonModel } from "~/lib/lessons/types/lesson-model";

export interface CourseModel {
    id: string;
    title: string;
    description: string;
    price?: number;
    isAvailable?: boolean;
    lessons: LessonModel[];
    backgroundImg: string;
}


