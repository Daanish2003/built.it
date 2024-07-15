import { z } from "zod";

export const categorySchema = z.object({
    label:z.string(),
    value: z.string(),
    disable: z.boolean().optional()
})