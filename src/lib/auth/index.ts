
import { Lucia } from "lucia";
import adapter from "./adapter";
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production", // set `Secure` flag in HTTPS
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// we don't need to expose the password hash!
			email: attributes.email
		};
	}
});

export const validatedRequest = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    
    if(!sessionId)
      return {
      user: null,
      session: null
      }

      const { user, session } = await lucia.validateSession(sessionId)

      try {
        if(session && session.fresh) {
          const sessionCookie = lucia.createSessionCookie(session.id)
          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          )
        }

        if (!session) {
          const sessionCookie = lucia.createBlankSessionCookie()
          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          )
        }
      } catch (error) {
        throw new Error("Error while validating Request")
      }
      return {
        user,
        session
      }
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
		};
	}
}