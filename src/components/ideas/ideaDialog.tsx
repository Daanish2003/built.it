"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'
import IdeaForm from './ideaForm'
import { useSession } from '@/providers/sessionProvider'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { openState } from '@/lib/store/atom'
import Link from 'next/link'

const IdeaDialog = () => {
    const { session } = useSession()
    const router = useRouter()


    const onClick = () => {
        router.push("/auth/login")
    }
    
  return (
    <>
    { session ? (<Button asChild variant={"outline"}><Link href="./shareIdeas">+ share Ideas</Link></Button>): (<Dialog>
        <DialogTrigger asChild>
           <Button size="lg" variant={"outline"}>+ Share Ideas</Button>
        </DialogTrigger>
        <DialogContent>
                <DialogHeader>
                    <DialogTitle>Required Login</DialogTitle>
                    <DialogDescription>Please login for posting the idea</DialogDescription>
                </DialogHeader>
               <Button onClick={onClick}>Login</Button>
        </DialogContent>
    </Dialog>)}
    </>
  )
}

export default IdeaDialog