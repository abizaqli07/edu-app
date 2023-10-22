import { z } from "zod"

export const createCourse = z.object({
  title: z.string().min(1, {
    message: "Title required"
  })
})

export const updateCourse = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).nullish(),
  description: z.string().nullish(),
  imageUrl: z.string().url().nullish(),
  categoryId: z.string().uuid().nullish(),
})

export const idCourse = z.object({
  id: z.string().uuid()
})

export const createChapter = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1)
})

export const updateChapter = z.object({
  id: z.string().uuid(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  videoUrl: z.string().url().nullish()
})

export const idChapter = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid()
})

export const progressChapter = z.object({
  userId: z.string(),
  chapterId: z.string().uuid(),
  isCompleted: z.boolean()
})

export const reorderChapter = z.object({
  courseId: z.string().uuid(),
  list: z.array(z.object({
    id: z.string().uuid(),
    position: z.number()
  }))
})

export const createAttachment = z.object({
  courseId: z.string().uuid(),
  url: z.string().url()
})

export const deleteAttachment = z.object({
  courseId: z.string().uuid(),
  id: z.string().uuid()
})

export const joinClass = z.object({
  courseId: z.string().uuid(),
  userId: z.string()
})