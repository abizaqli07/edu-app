import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { schema } from "@acme/db";

const createChapter = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1)
})

export const chapterRouter = createTRPCRouter({
  create: publicProcedure
    .input(createChapter)
    .mutation(async ({ ctx, input }) => {
      const lastChapter = await ctx.db.query.chapter.findFirst({
        where: (chapter, { eq }) => eq(chapter.courseId, input.courseId),
        orderBy: (chapter, { desc }) => [desc(chapter.position)],
      }).execute()

      const newPosition = lastChapter ? lastChapter.position + 1 : 1;

      const chapter = await ctx.db.insert(schema.chapter)
        .values({
          ...input,
          position: newPosition
        }).returning()

      return chapter
    }),

});