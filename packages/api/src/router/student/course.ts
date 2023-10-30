import { getChapterSchema, getClassSchema } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const course = await ctx.db.query.course.findMany({
        where: ((course, { eq }) => eq(course.isPublished, true)),
        with: {
          category: {
            columns: {
              name: true,
            }
          },
          chapters: true
        }
      }).execute()

      return course
    }),
  getOne: publicProcedure
    .input(getClassSchema)
    .query(async ({ ctx, input }) => {
      const classes = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.courseId)),
        with: {
          category: true,
          chapters: true
        }
      }).execute()

      return classes
    }),
  getChapter: publicProcedure
    .input(getChapterSchema)
    .query(async ({ ctx, input }) => {
      const chapter = await ctx.db.query.chapter.findFirst({
        where: ((chapter, { eq }) => eq(chapter.id, input.chapterId)),
        with: {
          muxData: true,
        }
      }).execute()

      return chapter
    })
});