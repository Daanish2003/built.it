"use server"
import prisma from "@/db";
import { validatedRequest } from "@/lib/auth";
import { ProfileSchema } from "@/lib/zod/profileSchema";
import { generateId } from "lucia";
import { z } from "zod";

export default async function Profile(values: z.infer<typeof ProfileSchema>) {
    const { session } = await validatedRequest()

    if(!session) {
        return {
            error: "Not Authenticated"
        }
    }
    const validatedFields = ProfileSchema.safeParse(values)

    if(!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { name, profileImage, bio, role} = validatedFields.data

    const createdProfile = await prisma.profile.create({
        data: {
            id: generateId(15),
            name: name,
            userId : session.userId,
            bio: bio,
            role: role
        }
    })

    await prisma.image.update({
        where: {
            id: profileImage
        },
        data: {
            profileId: createdProfile.id
        }
    })


    return {
       success: "Profile has been created"
    }
    
}