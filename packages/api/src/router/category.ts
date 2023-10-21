import { asc, schema } from "@acme/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const categories = ctx.db.query.category.findMany({
        orderBy: [asc(schema.category.name)]
      });

      return categories
    })
});