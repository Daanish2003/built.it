"use server"
import db from "@/db";
import { ideas } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validateRequest";
import { IdeaSchema } from "@/lib/zod/ideaSchema"
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { z } from "zod"


export const ideaSubmitting = async (values: z.infer<typeof IdeaSchema>) => {
    const validatedFields = IdeaSchema.safeParse(values)

    if(!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }
    
    const { title, description, image, video, tags, categories } = validatedFields.data

    const ideaId = generateId(15);
    const { user } = await validateRequest()
    const date = new Date()
    const userId = user?.id || ""
     console.log(userId)
    const newIdea = {
        id: ideaId,
        userId: userId,
        title: title,
        description: description,
        imageId: image,
        videoId: video,
        createdAt: date,
    }
    console.log(newIdea)

    await db.insert(ideas).values(newIdea).execute()

    revalidatePath("/")

    return { 
        success: "Idea has created successfully",
        url: "/"
        }

    
}