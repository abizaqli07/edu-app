import { adminRouter } from "./router/admin/admin";
import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  admin: adminRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
