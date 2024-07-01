"use server"
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from ".";

export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  
	if (!sessionId)
	  return {
		user: null,
		session: null,
	  }
  
	  const { user, session } = await lucia.validateSession(sessionId);

      

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
	} catch (error) {
		console.error("Error during session validation:", error);
        
	} return {
		user,
		session,
	  };
	
  })