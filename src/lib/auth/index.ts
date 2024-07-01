
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