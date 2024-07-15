import { z } from "zod";

export const tagSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional()
  })