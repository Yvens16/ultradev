import { UrlDetailsModel } from "./urldetails-model";

export interface LessonModel {
  id: string;
  title: string;
  description: string;
  courseId: string;
  mdxTranscriptionLink?: string;
  seqNo: number;
  urlDetails: UrlDetailsModel;
  isCompleted: boolean; // Marked as completed feature by the user || next btn + next+markedascompleted btne
  isPreviewOnly: boolean; // Preview only feature
}