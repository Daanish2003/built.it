import { relations } from "drizzle-orm";
import { videos } from "../schema/videoSchema";
import { ideas } from "../schema/ideaTableSchema";
import { user } from "../schema/authSchema";

export const videoRelation = relations(videos, ({ one }) => ({
   ideas: one(ideas, {
     fields: [videos.ideaId],
     references: [ideas.id]
   }),
   user: one(user, {
    fields:  [videos.userId],
    references: [user.id]
   })
}))