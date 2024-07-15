import { z } from "zod";

export const LinkEnum  = ["Github", "Youtube", "Discord", "Website", "WhatsApp", "Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok", "Snapchat", "Pinterest", "Reddit", "Twitch", "Spotify", "Tidal", "Apple Music", "Soundcloud", "Bandcamp", "Other", "Profile"] as const

export const LinkSchema = z.object({
    type: z.enum(LinkEnum),
    url: z.string().url("Invalid URL format")
})