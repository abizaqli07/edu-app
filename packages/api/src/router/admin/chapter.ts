import { eq, schema } from "@acme/db";
import { TRPCError } from "@trpc/server";
import { createChapter, idChapter, progressChapter, reorderChapter, updateChapter } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";



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
  update: publicProcedure
    .input(updateChapter)
    .mutation(async ({ ctx, input }) => {

      const chapter = await ctx.db.update(schema.chapter)
        .set({
          title: input.title ?? undefined,
          description: input.description,
          videoUrl: input.videoUrl
        })
        .where(eq(schema.chapter.id, input.id))
        .returning()

      if (input.videoUrl) {
        const existingMuxData = await ctx.db.query.muxData.findFirst({
          where: ((muxData, { eq }) => eq(muxData.chapterId, input.id))
        }).execute()

        if (existingMuxData) {
          await ctx.Video.Assets.del(existingMuxData.assetId)
          await ctx.db.delete(schema.muxData)
            .where(eq(schema.muxData.id, existingMuxData.id))
        }

        const asset = await ctx.Video.Assets.create({
          input: input.videoUrl,
          playback_policy: "public",
          test: false,
        });

        await ctx.db.insert(schema.muxData)
          .values({
            chapterId: input.id,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id
          });

        return chapter
      }
    }),
  unpublish: publicProcedure
    .input(idChapter)
    .mutation(async ({ ctx, input }) => {

      const unpublish = await ctx.db.update(schema.chapter)
        .set({
          isPublished: false
        })
        .where(eq(schema.chapter.id, input.id))
        .returning()

      const publishedChapterInCourse = await ctx.db.query.chapter.findMany({
        where: ((chapter, { eq }) => eq(chapter.courseId, input.courseId) && eq(chapter.isPublished, true))
      });

      if (!publishedChapterInCourse.length) {
        await ctx.db.update(schema.course)
          .set({
            isPublished: false
          })
          .where(eq(schema.course.id, input.courseId))
      }

      return unpublish
    }),
  publish: publicProcedure
    .input(idChapter)
    .mutation(async ({ ctx, input }) => {
      const chapter = await ctx.db.query.chapter.findFirst({
        where: ((chapter, { eq }) => eq(chapter.id, input.id) && eq(chapter.courseId, input.courseId))
      }).execute()

      const muxData = await ctx.db.query.muxData.findFirst({
        where: ((muxData, { eq }) => eq(muxData.chapterId, input.id))
      })

      if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
        return new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Missing required fields"
        })
      }

      const publish = await ctx.db.update(schema.chapter)
        .set({
          isPublished: true
        })
        .where(eq(schema.chapter.id, input.id) && eq(schema.chapter.courseId, input.courseId))
        .returning()

      return publish
    }),
  progress: publicProcedure
    .input(progressChapter)
    .mutation(async ({ ctx, input }) => {
      const userProgress = await ctx.db.insert(schema.userProgress)
        .values({
          userId: input.userId,
          chapterId: input.chapterId,
          isCompleted: input.isCompleted,
        })
        .onConflictDoUpdate({
          target: schema.userProgress.isCompleted,
          set: {
            isCompleted: input.isCompleted
          }
        })
        .returning()

      return userProgress
    }),
  reorder: publicProcedure
    .input(reorderChapter)
    .mutation(async ({ ctx, input }) => {
      for (const item of input.list) {
        await ctx.db.update(schema.chapter)
          .set({
            position: item.position
          })
          .where(eq(schema.chapter.id, item.id))
      }

      return {
        code: "SUCCESS",
        message: "Successfully reordered"
      }
    }),
  delete: publicProcedure
    .input(idChapter)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.chapter.findFirst({
        where: ((chapter, { eq }) => eq(chapter.id, input.id))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chapter Not Found"
        })
      }

      if (existed.videoUrl) {
        const existingMuxData = await ctx.db.query.muxData.findFirst({
          where: ((muxData, { eq }) => eq(muxData.chapterId, input.id))
        }).execute()

        if (existingMuxData) {
          await ctx.Video.Assets.del(existingMuxData.assetId)
          await ctx.db.delete(schema.muxData)
            .where(eq(schema.muxData.id, existingMuxData.id))
        }
      }

      const deletedChapter = await ctx.db.delete(schema.chapter)
        .where(eq(schema.chapter.id, input.id))
        .returning()

      const publishedChapterInCourse = await ctx.db.query.chapter.findMany({
        where: ((chapter, { eq }) => eq(chapter.courseId, input.courseId) && eq(chapter.isPublished, true))
      });

      if (!publishedChapterInCourse.length) {
        await ctx.db.update(schema.course)
          .set({
            isPublished: false
          })
          .where(eq(schema.course.id, input.courseId))
      }

      return deletedChapter
    }),
  getOne: publicProcedure
    .input(idChapter)
    .query(async ({ ctx, input }) => {
      const chapter = await ctx.db.query.chapter.findFirst({
        where: ((chapter, { eq }) => eq(chapter.id, input.id) && eq(chapter.courseId, input.courseId)),
        with: {
          muxData: true
        }
      }).execute()

      return chapter
    })
});