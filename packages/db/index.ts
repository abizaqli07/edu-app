import { drizzle } from "drizzle-orm/postgres-js";

import * as auth from "./schema/auth";
import * as post from "./schema/post";
import * as course from "./schema/course";
import postgres from "postgres";

export const schema = { ...auth, ...post, ...course };

export { myPgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString!)

export const db = drizzle(
  client,
  { schema },
);
