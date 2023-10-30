import { schema } from "@acme/db";
import { TRPCError } from "@trpc/server";
import { getAllClassSchema, joinClass } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const classroomRouter = createTRPCRouter({
  join: publicProcedure
    .input(joinClass)
    .mutation(async ({ ctx, input }) => {
      const isJoin = await ctx.db.query.classroom.findFirst({
        where: ((classroom, { eq, and }) => and(eq(classroom.courseId, input.courseId), eq(classroom.userId, input.userId)))
      }).execute()

      if (isJoin) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Already joined"
        });
      }

      const join = await ctx.db.insert(schema.classroom)
        .values({
          courseId: input.courseId,
          userId: input.userId
        })
        .returning()

      return join
    }),
  getAll: publicProcedure
    .input(getAllClassSchema)
    .query(async ({ ctx, input }) => {
      const classes = await ctx.db.query.classroom.findMany({
        where: ((classroom, { eq }) => eq(classroom.userId, input.userId ? input.userId : "")),
        with: {
          course: {
            with: {
              chapters: true,
              category: true
            }
          }
        }
      }).execute()

      return classes
    }),
});