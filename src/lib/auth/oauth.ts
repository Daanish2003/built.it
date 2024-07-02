import { GitHub, Google } from "arctic"

const isProduction = process.env.NODE_ENV === "production"

export const google = new Google(
    process.env.AUTH_GOOGLE_ID!,
    process.env.AUTH_GOOGLE_SECRET!,
    isProduction ? process.env.PROD_NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google" : process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google"
)

export const github = new GitHub(
    process.env.AUTH_GITHUB_ID!,
    process.env.AUTH_GITHUB_SECRET!,
    {
        redirectURI: process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/github"
    }
)