import { z } from "zod"

export const createCourse = z.object({
  title: z.string().min(1)
})

export const updateCourse = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  imageUrl: z.string().url(),
  categoryId: z.string().uuid(),
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
  title: z.string(),
  description: z.string(),
  videoUrl: z.string().url().nullable()
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