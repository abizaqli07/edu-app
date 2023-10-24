import { asc, desc, eq, schema } from "@acme/db";
import { TRPCError } from "@trpc/server";
import { createCourse, idCourse, updateCourse } from "../../inputSchema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const courseRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCourse)
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.db.insert(schema.course).values(input).returning();
      return course
    }),
  update: publicProcedure
    .input(updateCourse)
    .mutation(async ({ ctx, input }) => {

      const existed = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      const course = await ctx.db.update(schema.course)
        .set({
          title: input.title ?? undefined,
          description: input.description,
          imageUrl: input.imageUrl,
          categoryId: input.categoryId,
        })
        .where(eq(schema.course.id, input.id))
        .returning()

      return course
    }),
  unpublish: publicProcedure
    .input(idCourse)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      const course = await ctx.db.update(schema.course)
        .set({
          isPublished: false
        })
        .where(eq(schema.course.id, input.id))
        .returning()

      return course
    }),
  publish: publicProcedure
    .input(idCourse)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      const course = await ctx.db.update(schema.course)
        .set({
          isPublished: true
        })
        .where(eq(schema.course.id, input.id))
        .returning()

      return course
    }),
  delete: publicProcedure
    .input(idCourse)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      const course = await ctx.db.delete(schema.course)
        .where(eq(schema.course.id, input.id))
        .returning()

      return course
    }),
  getOne: publicProcedure
    .input(idCourse)
    .query(async ({ ctx, input }) => {
      const course = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id)),
        with: {
          chapters: {
            orderBy: [asc(schema.chapter.id)]
          },
          attachments: {
            orderBy: [desc(schema.attachment.createdAt)]
          }
        }
      }).execute()

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      return course
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const course = await ctx.db.query.course.findMany({
        orderBy: [desc(schema.course.createdAt)]
      })

      return course
    })
});