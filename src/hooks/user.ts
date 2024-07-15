"use server"
import prisma from "@/db"

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
              where : { email }
        });

        return user;
    } catch (error) {
        return null;
    }
}