"use server"
import db from "@/db";
import { ideasTable } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validateRequest";
import { IdeaSchema } from "@/lib/zod/ideaSchema"
import { useSession } from "@/providers/sessionProvider";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

export const ideaSubmitting = async (values: z.infer<typeof IdeaSchema>) => {
    const validatedFields = IdeaSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid Fields"}
    }

    const { title, description } = validatedFields.data

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