import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres"

const isProduction = process.env.NODE_ENV === 'production';

const migrationClient = postgres(isProduction ? process.env.PROD_DB_URL! : process.env.DEV_DB_URL!, { max: 1 });

async function migrateDb() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: isProduction ? process.env.PROD_DB_MIGRATIONS! : process.env.DEV_DB_MIGRATIONS!,
    })

    await migrationClient.end()
}

migrateDb()