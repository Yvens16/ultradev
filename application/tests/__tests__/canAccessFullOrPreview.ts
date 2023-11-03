import LessonDomain from "@domain/entity/LessonDomain"
import Id from "@domain/value_object/Id";
import LessonMetadata from "@domain/value_object/LessonMetadata";
import UrlDetails from "@domain/value_object/UrlDetails";
import { getLessons } from "../fixtures/lessons";
import LessonManagementUsecase from "@application/usecases/LessonManagementUseCase";
import LessonManagementInputPort from "@application/port/input/LessonManagementInputPort";
import UserDomain from "@domain/entity/UserDomain";
import { Role } from "@domain/domainType";
import UserIdentity from "@domain/value_object/UserIdentity";

describe("Test if a user can access a lesson", () => {
  const LESSONS: LessonDomain[] = getLessons();

  it("should return the lesson if the user has access to the lesson", () => {
    // Arrange
    const lesson = LESSONS[0];
    const lessonManager: LessonManagementUsecase = new LessonManagementInputPort();

    // Act
    const result = lessonManager.canAccessFullOrPreview({ lesson: lesson });

    // Assert
    expect(result).toBe(lesson);
  })
  it("should return the videoPreview if the user does not have access to the lesson", () => {
    // Arrange
    const lesson = LESSONS[3];
    const accessibleLesson = LESSONS[2];
    const lessonManager: LessonManagementUsecase = new LessonManagementInputPort();

    // Act
    const result = lessonManager.canAccessFullOrPreview({ lesson: lesson });
    const accessibleResult = lessonManager.canAccessFullOrPreview({ lesson: accessibleLesson });

    // Assert
    expect(result).not.toBe(lesson);
    expect(result).toBe(lesson.getUrlDetails().getVideoPreviewUrl());
    expect(accessibleResult).toBe(accessibleLesson);
  })

  it("Should return the lesson if the user exists", () => {
    // Arrange
    const lesson = LESSONS[3];
    const user: UserDomain = new UserDomain({
      id: new Id("1"),
      isNewAccount: false,
      organizationId: "1",
      plan: "premium",
      userIdentity: new UserIdentity({
        firstname: "John",
        lastname: "Doe",
        email: "johnDoe@gmail.com",
        role: Role.STUDENT,
        createdAt: new Date(),
      }),
    });
    const lessonManager: LessonManagementUsecase = new LessonManagementInputPort();

    // Act
    const result = lessonManager.canAccessFullOrPreview({ lesson: lesson, user: user });

    // Assert
    expect(result).toBe(lesson);
  })
})