import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const IdeaFormWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <Card className="w-[1000px] bg-transparent border-none shadow-none">
        <CardHeader>
             <CardTitle>Submit Your Idea</CardTitle>
             <CardDescription>Fill the Form to Submit Your Idea</CardDescription>
             <Button asChild variant={"link"} className='justify-start px-0'><Link href="/" className="underline"><ArrowLeft /> Go Back to Home Page</Link></Button>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
  )
}

export default IdeaFormWrapper