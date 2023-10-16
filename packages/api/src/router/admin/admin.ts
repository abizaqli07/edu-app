import { createTRPCRouter } from "../../trpc";
import { attachmentRouter } from "./attachment";
import { chapterRouter } from "./chapter";
import { courseRouter } from "./course";

export const adminRouter = createTRPCRouter({
  course: courseRouter,
  chapter: chapterRouter,
  attachment: attachmentRouter
});