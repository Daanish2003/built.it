"use server"
import { lucia, validateRequest } from "@/lib/auth"
import { cookies } from "next/headers";

export const logout = async (): Promise<ActionResult> => {
    const { session } = await validateRequest()
    if (!session) {
        return {
            success: false,
            error: "Unauthorized",
            message: null
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
    
    await lucia.deleteExpiredSessions();
    return {
        success: true,
        message: "Logged Out",
        error: null
    }
}

