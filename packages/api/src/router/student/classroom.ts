import { schema } from "@acme/db";
import { joinClass } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const classroomRouter = createTRPCRouter({
  join: publicProcedure
    .input(joinClass)
    .mutation(async ({ ctx, input }) => {
      const isJoin = await ctx.db.query.classroom.findFirst({
        where: ((classroom, { eq }) => eq(classroom.courseId, input.courseId) && eq(classroom.userId, input.userId))
      }).execute()

      if (isJoin) {
        return new TRPCError({
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
    })
});