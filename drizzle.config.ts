import { defineConfig } from 'drizzle-kit'

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
 schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  out: isProduction ?  process.env.PROD_DB_MIGRATIONS! : process.env.DEV_DB_MIGRATIONS,
  dbCredentials: {
    url: isProduction ? process.env.PROD_DB_URL! : process.env.DEV_DB_URL!,
  },
  verbose: !isProduction,
  strict: true,
})