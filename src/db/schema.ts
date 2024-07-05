import { pgTable, text, timestamp, varchar, serial, primaryKey, integer} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	email: text("email").unique().notNull(),
	profilePictureUrl: text("profile_picture_url"),
  name: text("name").notNull(),
});

export const oauthAccountTable = pgTable("oauth_account", {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    provider: text("provider").notNull(), // google, github
    providerUserId: text("provider_user_id").notNull(),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }),
  })


 export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull().defaultNow()
});

export const ideasTable = pgTable("ideas", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => userTable.id),
  imageId: text("image_id").notNull().references(() => imagesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
 // tags: text("tags"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow()
})

export const commentsTable = pgTable("comments", {
    id: text("id").primaryKey(),
    ideaId: text("idea_id").notNull().references(() => ideasTable.id),
    userId: text("user_id").notNull().references(() => userTable.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date"
    }).notNull().defaultNow()
})

export const likesTable = pgTable("likes", {
     id: text("id").primaryKey(),
     userId: text("user_id").notNull().references(() => userTable.id),
     ideaId: text("idea_id").notNull().references(() => ideasTable.id),
     createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date"
    }).notNull().defaultNow()
})

export const imagesTable = pgTable("images", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => userTable.id),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow()
})
// export const viewsTable = pgTable("views", {
//   id: text("id").primaryKey(),
//   userId: text("user_id").notNull().references(() => userTable.id),
//   ideaId: text("idea_id").notNull().references(() => ideasTable.id),
//   viewedAt: timestamp("created_at", {
//       withTimezone: true,
//       mode: "date"
//     }).notNull()
// })

// export const tagsTable = pgTable("tags", {
//   id: text("id").primaryKey(),
//   name: varchar('name', { length: 50 }).notNull().unique(),
// });

// export const ideaTagsTable = pgTable("idea_tags", {
//   ideaId: text("idea_id").notNull().references(() => ideasTable.id, {onDelete: 'cascade'}),
//   tagId: text("tag_id").notNull(),
  
// })