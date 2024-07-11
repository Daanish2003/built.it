import { relations } from "drizzle-orm";
import { ideas } from "../schema/ideaTableSchema";
import { user } from "../schema/authSchema";
import { ideatags, tags } from "../schema/tagSchema";
import { category, ideascategory } from "../schema/categorySchema";
import { videos } from "../schema/videoSchema";
import { images } from "../schema/imageSchema";
import { ideaTagRelation } from "./tagRelation";

// many ideas coud have only one author
// one idea could have many videos
// one idea could have many images
// one idea could have many tags
// one idea could have many categories 

export const ideasRelation = relations(ideas, ({one, many}) => ({
    user: one(user, {
      fields: [ideas.userId],
      references: [user.id]
    }),
    video: many(videos),
    image: many(images),
    tags: many(ideatags),
    categories: many(ideascategory)
  }));

