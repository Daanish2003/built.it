import { pgTable, text, timestamp } from "drizzle-orm/pg-core";


export const user = pgTable("user", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    profilePictureUrl: text("profile_picture_url"),
    name: text("name").notNull(),
  });
  
  export const oauthAccount = pgTable("oauth_account", {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    provider: text("provider").notNull(), // google, github
    providerUserId: text("provider_user_id").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }),
  });
  
  export const session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  });