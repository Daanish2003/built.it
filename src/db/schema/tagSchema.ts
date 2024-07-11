import { pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { ideas } from "./ideaTableSchema";


export const tags = pgTable("tags", {
    id: text("id").primaryKey(),
    value: varchar("value", {length: 256}).notNull()
  })

  export const ideatags = pgTable("idea_tag_table", {
    ideaId: text("idea_id").notNull().references(() => ideas.id),
    tagId: text("tag_id").notNull().references(() => tags.id)
  }, (t) => {
    return {
        pk: primaryKey({ columns: [t.ideaId, t.tagId]})
    }
  })