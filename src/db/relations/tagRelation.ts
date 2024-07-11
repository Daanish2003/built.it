import { relations } from "drizzle-orm";
import { ideatags, tags } from "../schema/tagSchema";
import { ideas } from "../schema/ideaTableSchema";

export const tagRelation = relations(tags, ({ many }) => ({
    tags: many(ideatags)
    })
)

export const ideaTagRelation = relations(ideatags, ({ one }) => ({
    tags: one(tags, {
        fields: [ideatags.tagId],
        references: [tags.id],
    }),
    ideas: one(ideas, {
        fields: [ideatags.ideaId],
        references: [ideas.id],
    })
}))