"use server"

import db from "@/db"
import { ideasTable } from "@/db/schema"

export default async function getIdeas() {
    try {
        const allIdeas = await db.select().from(ideasTable)
        return allIdeas
    } catch (error) {
        console.error("Error fetching ideas: ", error);
        return []
    }
}