import { createTRPCRouter } from "../../trpc";
import { classroomRouter } from "./classroom";
import { courseRouter } from "./course";

export const studentRouter = createTRPCRouter({
  classroom: classroomRouter,
  course: courseRouter
});