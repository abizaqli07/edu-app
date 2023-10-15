import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

import { myPgTable } from "./_table";

export const category = myPgTable("category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  });

export const categoryRelations = relations(category, ({ many }) => ({
  courses: many(course)
}))

export const course = myPgTable("course",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    imageUrl: text("imageUrl"),
    isPublished: boolean("isPublished").notNull().default(false),
    categoryId: uuid("categoryId").references(() => category.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  });

export const courseRelations = relations(course, ({ one, many }) => ({
  category: one(category, {
    fields: [course.categoryId],
    references: [category.id]
  }),
  chapters: many(chapter),
  attachments: many(attachment),
  classrooms: many(classroom)
}))

export const attachment = myPgTable("attachment",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    url: text("url").notNull(),
    courseId: uuid("courseId").notNull().references(() => course.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  })

export const attachmentRelations = relations(attachment, ({ one }) => ({
  course: one(course, {
    fields: [attachment.courseId],
    references: [course.id],
  })
}))

export const chapter = myPgTable("chapter",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    videoUrl: text("videoUrl"),
    position: integer("position").notNull().default(0),
    isPublished: boolean("isPublished").notNull().default(false),
    courseId: uuid("courseId").notNull().references(() => course.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  });

export const chapterRelations = relations(chapter, ({ one, many }) => ({
  muxData: one(muxData, {
    fields: [chapter.id],
    references: [muxData.chapterId]
  }),
  course: one(course, {
    fields: [chapter.courseId],
    references: [course.id]
  }),
  userProgresses: many(userProgress)
}))

export const muxData = myPgTable("muxData",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    assetId: text("assetId").notNull(),
    playbackId: text("playbackId"),
    chapterId: uuid("chapterId").notNull().references(() => chapter.id)
  })

export const userProgress = myPgTable("userProgress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull(),
    isCompleted: boolean("isCompleted").notNull().default(false),
    chapterId: uuid("chapterId").notNull().references(() => chapter.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  });

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  chapter: one(chapter, {
    fields: [userProgress.chapterId],
    references: [chapter.id]
  })
}))

export const classroom = myPgTable("class",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull(),
    courseId: uuid("courseId").notNull().references(() => course.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  })

export const classroomRelations = relations(classroom, ({ one }) => ({
  course: one(course, {
    fields: [classroom.courseId],
    references: [course.id]
  })
}))





