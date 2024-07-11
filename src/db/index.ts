import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from "postgres"

const isProduction = process.env.NODE_ENV === 'production';

const client = postgres(isProduction ? process.env.PROD_DB_URL! : process.env.DEV_DB_URL!, { max: 1 })
const db = drizzle(client, { schema, logger:true }) as PostgresJsDatabase<typeof schema>

export default db;