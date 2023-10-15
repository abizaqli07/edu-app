import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { eq, schema } from "@acme/db";
import { TRPCError } from "@trpc/server";

const createCourse = z.object({
  title: z.string().min(1)
})

const updateCourse = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  imageUrl: z.string().url(),
  categoryId: z.string().uuid(),
})

const idCourse = z.object({
  id: z.string().uuid()
})

export const courseRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCourse)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(schema.course).values(input);
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
        .set(input)
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
        .where(eq(schema.course, input.id))
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
        .where(eq(schema.course, input.id))
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
    })
});