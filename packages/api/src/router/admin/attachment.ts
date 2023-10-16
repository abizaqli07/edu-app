import { eq, schema } from "@acme/db";
import { createAttachment, deleteAttachment } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const attachmentRouter = createTRPCRouter({
  create: publicProcedure
    .input(createAttachment)
    .mutation(async ({ ctx, input }) => {

      const name = input.url.split("/").pop()

      const attachment = await ctx.db.insert(schema.attachment)
        .values({
          url: input.url,
          name: name!,
          courseId: input.courseId,
        })
        .returning()

      return attachment

    }),
  delete: publicProcedure
    .input(deleteAttachment)
    .mutation(async ({ ctx, input }) => {
      const attachment = await ctx.db.delete(schema.attachment)
        .where(eq(schema.attachment.id, input.id) && eq(schema.attachment.courseId, input.courseId))
        .returning()

      return attachment
    })
});