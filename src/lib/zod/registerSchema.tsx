import { z } from "zod";

export const RegisterSchema  = z.object({
     email: z
     .string()
     .email({message: "Invalid email address"})
     .min(1, {message: "Email is required"}),
     password: z
     .string()
     .min(6, {message: "Password must be at least 6 characters long"})
     .max(64, {message: "Password must be at most 64 characters long"}),
     confirmPassword: z
     .string()
     .min(6, {message: "Password must be at least 6 characters long"})
     .max(64, {message: "Password must be at most 64 characters long"}),
}).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
});