import { createTRPCRouter } from "../../trpc";
import { classroomRouter } from "./classroom";

export const studentRouter = createTRPCRouter({
  classroom: classroomRouter
});