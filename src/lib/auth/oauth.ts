import { GitHub, Google } from "arctic"

export const google = new Google(
    process.env.AUTH_GOOGLE_ID!,
    process.env.AUTH_GOOGLE_SECRET!,
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google"
)

export const github = new GitHub(
    process.env.AUTH_GITHUB_ID!,
    process.env.AUTH_GITHUB_SECRET!,
    {
        redirectURI: process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/github"
    }
)