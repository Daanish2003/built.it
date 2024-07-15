"use server"
import db from "@/db";
import { validatedRequest } from "@/lib/auth";
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
    const date = new Date()
    
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

    

    revalidatePath("/")

    return { 
        success: "Idea has created successfully",
        url: "/"
        }

    
}