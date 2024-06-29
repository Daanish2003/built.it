
import { Lucia } from "lucia";
import { adapter } from "./adapter"
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			providerId: attributes.provider_id,
			providerUserId: attributes.provider_user_id,
            userId: attributes.user_id
		};
	}
});

export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  
	if (!sessionId)
	  return {
		user: null,
		session: null,
	  }
  
	const { user, session } = await lucia.validateSession(sessionId)
	try {
	  if (session && session.fresh) {
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
	} catch {
	  // Next.js throws error when attempting to set cookies when rendering page
	}
	return {
	  user,
	  session,
	}
  })

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	provider_id: string;
	provider_user_id: string;
	user_id: string;
}