"use server"
import db from "@/db";
import { ideasTable, imagesTable } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validateRequest";
import { IdeaSchema } from "@/lib/zod/ideaSchema"
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { z } from "zod"

type Content = {
    title: string
    description: string
  }


export const ideaSubmitting = async (content: Content, imageId: string) => {

    const { title, description } = content

    if (typeof title !== 'string' || typeof description !== 'string') {
        return {
            error: "Invalid Types"
        }
    }


    const ideaId = generateId(15);
    const { user } = await validateRequest()
    const date = new Date()
    const userId = user?.id || ""
     console.log(userId)
    const newIdea = {
        id: ideaId,
        userId: userId,
        title: title,
        imageId: imageId,
        description: description,
        createdAt: date,
    }
    console.log(newIdea)

    await db.insert(ideasTable).values(newIdea).execute()

    revalidatePath("/")

    return { 
        success: "Idea has created successfully",
        url: "/"
        }

    
}