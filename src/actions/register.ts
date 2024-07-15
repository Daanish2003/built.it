"use server"
import prisma from "@/db"
import { getUserByEmail } from "@/hooks/user"
import { RegisterSchema } from "@/lib/zod/registerSchema"
import { z } from "zod"
import * as argon2 from "argon2"
import { lucia } from "@/lib/auth"
import { generateId } from "lucia"
import { cookies } from "next/headers"

export default async function Register(values: z.infer<typeof RegisterSchema>) {
   const validatedFields = RegisterSchema.safeParse(values)

   if(!validatedFields.success) {
    return {
        error: "Invalid Fields"
    }
   }

   const { email, password} = validatedFields.data;

   const hashPassword = await argon2.hash(password)

   const userId = generateId(15)


   const existingUser  = await getUserByEmail(email)

   if (existingUser) {
    return {
        error: "Email is already in use!"
    }
   }

   await prisma.user.create({
        data: {
            id: userId,
            email: email,
            hashPassword: hashPassword
        }
   })

   const session = await lucia.createSession(userId, {})

   const sessionCookie = lucia.createSessionCookie(session.id)

   cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
   )
   
   return {
    data: userId,
    success: "User has been created successfully"
   }
}