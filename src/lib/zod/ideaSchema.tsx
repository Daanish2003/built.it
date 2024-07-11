import { z } from "zod"
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const categorySchema = z.object({
  label:z.string(),
  value: z.string(),
  disable: z.boolean().optional()
})

const tagSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
})


export const IdeaSchema = z.object({
    title: z.string().min(2, {message: "minimum 2 characters are required"}),
    description: z.string().min(2, {message: "minimum 2 characters required"}),
    tags: z.array(tagSchema).min(1, {message: "Atleast Select one Tag"}),
    image: z.string().min(1, {message: "Image is required"}),
    categories: z.array(categorySchema).min(1, {message: "Atleast Select One Category"}).max(1, {message: "Catogries should not exceed 5 categories"}),
    video: z.string().min(1, {message: "Video is required"})
}).required()