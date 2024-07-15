import { z } from "zod";
import { ImageSchema } from "./FileSchema";
import { LinkSchema } from "./linkSchema";


export const ProfileSchema = z.object({
    name: z
    .string()
    .min(1, {message: "Name is required"})
    .max(50, {message: "Name must be at most 50 characters long"}).toUpperCase(),
    role: z
    .string()
    .min(1, {message: "Role is required"})
    .max(50, {message: "Role must be at most 50 characters long"}).toUpperCase(),
    bio: z
    .string()
    .min(1, {message: "Name is required"})
    .max(255, {message: "Name must be at most 255 characters long"}),
    profileImage: z.number().nonnegative(),
    links: z.array(z.lazy(() => LinkSchema)).optional()
})