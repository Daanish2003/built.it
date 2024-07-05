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
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image").optional(),
}).required()