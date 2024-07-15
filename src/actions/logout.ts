"use server"
import { lucia, validatedRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function Logout() {
    try {
        const { session } = await validatedRequest()

        if (!session) {
            return { 
                error: "Unauthorized",
            }
        }

        await lucia.invalidateSession(session.id)

        const sessionCookie = lucia.createBlankSessionCookie()

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )
    } catch (error: any) {
        return {
            error: error?.message
        }
    }
}