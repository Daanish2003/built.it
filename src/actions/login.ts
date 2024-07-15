"use server"
import { getUserByEmail } from '@/hooks/user';
import LoginSchema from '@/lib/zod/loginSchema'
import { z } from 'zod';
import * as argon2 from "argon2"
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';

export default async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
        error: 'Invalid Fields'
        }
    }
    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return {
        error: "User not found"
      }
    }

    if (!existingUser.hashPassword) {
      return {
        error: "User not found",
      }
    }

    const isValidPassword = await argon2.verify(existingUser.hashPassword, password)

    if (!isValidPassword) {
      return {
        error: "Incorrect username or password",
      }
    }

    const session = await lucia.createSession(existingUser.id, {})
  
    const sessionCookie = lucia.createSessionCookie(session.id)
  
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  
    return {
      success: "Logged in successfully",
    }
}