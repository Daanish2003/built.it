import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === 'production';
export const connectionString = isProduction ? process.env.PROD_DB_URL! : process.env.DEV_DB_URL!;

const pool = new Pool({
    connectionString,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>

export default db;