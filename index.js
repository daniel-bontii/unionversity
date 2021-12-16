"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = require("./courses");
const studyGroups_1 = require("./studyGroups");
let enrolledEvents = [];
const searchEvents = (options) => {
    const events = options.eventType === "courses" ? courses_1.default : studyGroups_1.default;
    return events.filter((event) => {
        if (typeof options.query === "number") {
            return options.query === event.id;
        }
        if (typeof options.query === "string") {
            return event.keywords.includes(options.query);
        }
    });
};
const enroll = (events) => {
    events.forEach((event) => {
        enrolledEvents.push(event);
    });
};
const dropCourse = (courseId) => {
    const toDrop = enrolledEvents.findIndex((event) => {
        return event.id === courseId;
    });
    enrolledEvents.splice(toDrop, 1);
};
const printEnrolledEventTitles = (enrolledEvents) => {
    console.log("-----ENROLLED COURSES-----");
    enrolledEvents.forEach((event) => {
        console.log(event.title);
    });
};
const searchResult = searchEvents({ query: "art", eventType: "courses" });
enroll(searchResult);
printEnrolledEventTitles(searchResult);
console.log(enrolledEvents);
dropCourse(3);
console.log(enrolledEvents);
