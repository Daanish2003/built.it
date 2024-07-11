import { relations } from "drizzle-orm";
import { ideas } from "../schema/ideaTableSchema";
import { category, ideascategory } from "../schema/categorySchema";

export const categoryRelation = relations(category, ({ many }) => ({
    categories: many(ideascategory)
}))

export const ideaCategoryRelation = relations(ideascategory, ({ one }) => ({
    category: one(category, {
        fields: [ideascategory.categoryId],
        references: [category.id]
    }),
    ideas: one(ideas, {
        fields: [ideascategory.ideaId],
        references: [ideas.id]
    })
}))