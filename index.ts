import courses from "./courses";
import studyGroups from "./studyGroups";

type Course = {
  id: number;
  studyGroupId: number;
  title: string;
  keywords: string[];
  eventType: string;
};

type StudyGroup = {
  id: number;
  courseId: number;
  title: string;
  keywords: string[];
  eventType: string;
};

type SearchEventsOptions = {
  query: string | number;
  eventType: "courses" | "groups";
};

let enrolledEvents: (Course | StudyGroup)[] = [];

const searchEvents = (options: SearchEventsOptions) => {
  const events: (Course | StudyGroup)[] =
    options.eventType === "courses" ? courses : studyGroups;

  return events.filter((event: Course | StudyGroup) => {
    if (typeof options.query === "number") {
      return options.query === event.id;
    }
    if (typeof options.query === "string") {
      return event.keywords.includes(options.query);
    }
  });
};

const enroll = (events: (Course | StudyGroup)[]) => {
  events.forEach((event) => {
    enrolledEvents.push(event);
  });
};

const dropCourse = (courseId: number) => {
  const toDrop = enrolledEvents.findIndex((event) => {
    return event.id === courseId;
  });
  enrolledEvents.splice(toDrop, 1);
};

const printEnrolledEventTitles = (enrolledEvents: (Course | StudyGroup)[]) => {
  console.log("-----ENROLLED COURSES-----");
  enrolledEvents.forEach((event: Course | StudyGroup) => {
    console.log(event.title);
  });
};

const searchResult = searchEvents({ query: "art", eventType: "courses" });

enroll(searchResult);

printEnrolledEventTitles(searchResult);
console.log(enrolledEvents);

dropCourse(3);

console.log(enrolledEvents);
