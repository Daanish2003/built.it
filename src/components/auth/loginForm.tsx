import React from 'react'
import AuthCard from './authCard'
import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'
import { createGithubAuthorizationURL, createGoogleAuthorizationURL } from '@/app/actions/login'



const LoginForm = () => {
  const router = useRouter()

  const GoogleAuth = async () => {
    const googleAuth = await createGoogleAuthorizationURL()
    if (googleAuth.success) {
         router.push(googleAuth.data)
    } else {
        console.log(googleAuth.error)
    }
}

const GithubAuth = async () => {
  const githubAuth = await createGithubAuthorizationURL()
  if(githubAuth.success) {
    router.push(githubAuth.data)
  } else if (githubAuth.error) {
    console.log(githubAuth.error)
  }
}


       
  return (
    <AuthCard
      cardTitle='Login'
      cardDescription='Login into your account'
      backButtonHref='/'
      backButtonLabel='Go back to home page'
    >
            <Button type="submit" onClick={GoogleAuth}>Google</Button>
            {/* <Button type="submit" onClick={GithubAuth}>Github</Button> */}
    </AuthCard>
  )
}

export default LoginForm