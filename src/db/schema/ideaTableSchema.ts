import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./authSchema";
import { images } from "./imageSchema";
import { videos } from "./videoSchema";
import { tags } from "./tagSchema";
import { category } from "./categorySchema";

// user many ideas

export const ideas = pgTable("idea", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    }).notNull().defaultNow(),
  });
  