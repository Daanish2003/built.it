import React, { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ProfileCard = ({children}: {children : ReactNode}) => {
  return (
    <Card className="w-[550px] bg-transparent shadow-none border-none">
        <Button asChild variant={"link"}><Link href="./auth/register"><span className='flex gap-x-1 items-center'><ArrowLeft />Return to Register Page</span></Link></Button>
        <CardHeader>
            <CardTitle>Create Your Profile</CardTitle>
            <CardDescription>Please enter the fields to fill the form</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
  )
}

export default ProfileCard