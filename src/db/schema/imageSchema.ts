import { pgTable, text } from "drizzle-orm/pg-core";

export const images = pgTable("image", {
    id: text("id").primaryKey(),
    imageUrl: text("image_url").notNull(),
    userId: text("user_id"),
    ideaId: text("idea_id")
  });