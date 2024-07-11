import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import db from "@/db";
import { session, user } from "@/db/schema";

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user);