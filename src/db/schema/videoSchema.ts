import { pgTable, text } from "drizzle-orm/pg-core";

export const videos = pgTable("video", {
    id: text("id").primaryKey(),
    videoUrl: text("video_url").notNull(),
    userId: text("user_id"),
    ideaId: text("idea_id")
  });