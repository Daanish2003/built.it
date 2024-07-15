import { z } from "zod"
import { tagSchema } from "./tagSchema";
import { categorySchema } from "./categorySchema";



export const IdeaSchema = z.object({
    title: z.string().min(2, {message: "minimum 2 characters are required"}),
    description: z.string().min(2, {message: "minimum 2 characters required"}),
    tags: z.array(tagSchema).min(1, {message: "Atleast Select one Tag"}),
    image: z.number().nonnegative(),
    categories: z.array(categorySchema).min(1, {message: "Atleast Select One Category"}).max(1, {message: "Catogries should not exceed 5 categories"}),
    video: z.number().nonnegative(),
}).required()