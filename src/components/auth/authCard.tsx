import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

const AuthCard = ({ cardTitle, cardDescription, backButtonHref, backButtonLabel, children}: AuthCard) => {
  return (
    <Card className="w-[450px] bg-transparent border-none">
        <CardHeader className="space-y-4 text-center">
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
            {children}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
            <Button variant="link"><Link href={backButtonHref}>{backButtonLabel}</Link></Button>
        </CardFooter>
    </Card>
  )
}

export default AuthCard