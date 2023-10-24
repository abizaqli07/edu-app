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
    })
});