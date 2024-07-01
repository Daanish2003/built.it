"use server"
import { github, google } from "@/lib/auth/oauth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";


export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState();
  const codeVerifier = generateCodeVerifier();
   

   cookies().set("state", state, {
      httpOnly: true,
   })

   cookies().set("codeVerifier", codeVerifier, {
    httpOnly: true,
 })

   const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"]
    })

    const url = authorizationURL.toString()

  return {
    success: true,
    data: url,
  }

  } catch (error: any) {
    return {
      error: error?.message
    }
  }
}

export const createGithubAuthorizationURL = async () => {
  try {
    const state = generateState() // generate a random string 6 characters long

    cookies().set("state", state, {
      httpOnly: true,
    })

    
  

    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ["user:email"],
    })
    

    const url = authorizationURL.toString()

    return {
      success: true,
      data: url
    }
    
    
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

