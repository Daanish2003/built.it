import { relations } from "drizzle-orm";
import { images } from "../schema/imageSchema";
import { ideas } from "../schema/ideaTableSchema";
import { user } from "../schema/authSchema";

export const imageRelations = relations(images, ({ one }) => ({
    idea: one(ideas, {
        fields: [images.ideaId],
        references: [ideas.id]
    }),
    user: one(user, {
        fields: [images.userId],
        references: [user.id]
    })
}))