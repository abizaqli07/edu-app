import { adminRouter } from "./router/admin/admin";
import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { studentRouter } from "./router/student/student";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  admin: adminRouter,
  student: studentRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
