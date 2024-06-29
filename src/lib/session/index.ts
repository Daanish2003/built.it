"use server"
import { cache } from "react";
import { validateRequest } from "../auth";

export const getCurrentUser = cache(async () => {
    const session = await validateRequest();
    if (!session.user) {
      return undefined;
    }
    return session.user;
  });