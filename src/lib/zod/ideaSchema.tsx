import { z } from "zod"
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const IdeaSchema = z.object({
    title: z.string().min(2, {message: "minimum 2 characters are required"}),
    description: z.string().min(2, {message: "minimum 2 characters required"}),
    //tags: z.array(z.string()).nonempty().optional(),
    //image: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),"Only .jpg, .jpeg, .png and .webp formats are supported.").nullable().optional(),
}).required()