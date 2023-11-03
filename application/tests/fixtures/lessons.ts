import LessonDomain from "@domain/entity/LessonDomain";
import Id from "@domain/value_object/Id";
import LessonMetadata from "@domain/value_object/LessonMetadata";
import UrlDetails from "@domain/value_object/UrlDetails";

export const getLessons = (): LessonDomain[] => {
  const lessons: LessonDomain[] = [];
  for (let i = 0; i < 6; i++) {
    const lesson = new LessonDomain({
      id: new Id(),
      lessonMetadata: new LessonMetadata({
        title: `title ${i+1}`,
        description: `description ${i+1}`,
        content: `content ${i+1}`,
        createdAt: new Date(),
      }),
      courseId: new Id("1"),
      order: i+1,
      urlDetails: new UrlDetails({
        videoPreviewUrl: "https://video-preview.com",
        videoUrl: "https://video.com",
        gitpodUrl: "https://gitpod.com",
        codetourUrl: "https://codetour.com",
      })
    });
    lessons.push(lesson);
  }
  return lessons;
}