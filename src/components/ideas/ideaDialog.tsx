
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'
import IdeaForm from './ideaForm'
import { useSession } from '@/providers/sessionProvider'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { openState } from '@/lib/store/atom'

const IdeaDialog = () => {
    const [open ,setOpen] = useRecoilState(openState)
    const { session } = useSession()
    const router = useRouter()


    const onClick = () => {
        router.push("/auth/login")
    }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
           <Button size="lg" variant={"outline"}>+ Share Ideas</Button>
        </DialogTrigger>
        <DialogContent>
            {session ? (<DialogHeader>
                <DialogTitle>
                    Share Your Ideas
                </DialogTitle>
                <DialogDescription>
                    Fill the fields to complete submit your ideas
                </DialogDescription>
            </DialogHeader>) : (
                <DialogHeader>
                    <DialogTitle>Required Login</DialogTitle>
                    <DialogDescription>Please login for posting the idea</DialogDescription>
                </DialogHeader>
            )}
            {session ? (<IdeaForm />): (<Button onClick={onClick}>Login</Button>)}
        </DialogContent>
    </Dialog>
  )
}

export default IdeaDialog