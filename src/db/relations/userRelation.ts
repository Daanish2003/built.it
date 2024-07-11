import { relations } from "drizzle-orm";
import { ideas } from "../schema/ideaTableSchema";
import { user } from "../schema/authSchema";
import { images } from "../schema/imageSchema";
import { videos } from "../schema/videoSchema";

export const usersRelation = relations(user, ({ many }) => ({
    ideas: many(ideas),
    image: many(images),
    video: many(videos),
  }))