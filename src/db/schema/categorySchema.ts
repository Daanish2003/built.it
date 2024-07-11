import { pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { ideas } from "./ideaTableSchema";

export const category = pgTable("category", {
    id: text("id").primaryKey(),
    value: varchar("value", {length: 255}).notNull()
  })

  export const ideascategory = pgTable("ideas_category_table", {
    ideaId: text("idea_id").notNull().references(() => ideas.id),
    categoryId: text("category_id").notNull().references(() => category.id),
  }, (t) => {
    return {
        pk: primaryKey({ columns: [t.ideaId, t.categoryId]})
    }
  })