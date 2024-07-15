"use client"
import React, { useState, useTransition } from 'react'
import ProfileCard from './ProfileCard'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { ProfileSchema } from "@/lib/zod/profileSchema"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ACCEPTED_IMAGE_MIME_TYPES } from '@/lib/zod/FileSchema'
import { Button } from '../ui/button'
import { AutosizeTextarea } from '../ui/AutosizeTextarea'
import handleFileUpload from '@/lib/helpers/handleFileUpload'
import Profile from '@/actions/profile'
import { useRouter } from 'next/navigation'
import FormError from '../auth/formError'
import { FormSuccess } from '../auth/formSuccess'

const ProfileForm = () => {
    const [ previewProfile, setPreviewProfile] = useState<string | ArrayBuffer |null>(null)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm<z.infer<typeof ProfileSchema>>({
      resolver: zodResolver(ProfileSchema),
      defaultValues: {
        name: "",
        bio: "",
        role: "",
        profileImage: 0,
        links: []
      }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
       if (file) {
        const reader = new FileReader()
        const id = await handleFileUpload(file, "profileImage")
        reader.onload = () => setPreviewProfile(reader.result)
        reader.readAsDataURL(file)
        form.setValue("profileImage", id)
        form.clearErrors("profileImage")
       }
    }

    const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
      setError("")
      setSuccess("")
   
      startTransition(() => {
         Profile(values).then((data) => {
          if(data.error) {
            setError(data.error)
          } else if(data.success) {
            setSuccess(data.success)
            router.push("/")
          }
         })
      })

    }
  return (
    <ProfileCard>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField 
                control={form.control}
                name="profileImage"
                render= {() => (
                  <FormItem className="flex justify-center">
                     <FormLabel htmlFor='avatar-input'>
                     <Avatar className="w-40 h-40 cursor-pointer border-2 border-gray-200">
                          <AvatarImage src={previewProfile as string} />
                          <AvatarFallback className='bg-white'>Profile</AvatarFallback>
                        </Avatar>
                     </FormLabel>
                     <FormControl>
                        <Input
                          disabled={isPending} 
                           id="avatar-input"
                           type="file"
                           accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
                           className="hidden"
                           onChange={handleChange}
                           />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="name"
                render= {({field}) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input 
                            disabled={isPending} 
                            type="text" 
                            placeholder="Enter Your Name" 
                            {...field}/>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="bio"
                render= {({field}) => (
                  <FormItem>
                     <FormLabel>Bio</FormLabel>
                     <FormControl>
                        <AutosizeTextarea
                             disabled={isPending}  
                             placeholder="Describe yourself" 
                             {...field}/>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="role"
                render= {({field}) => (
                  <FormItem>
                     <FormLabel>Role</FormLabel>
                     <FormControl>
                        <Input 
                            disabled={isPending}
                            type="text" 
                            placeholder="Ex web developer" 
                            {...field}
                         />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error}/>
              <FormSuccess message={error}/>
              <Button type="submit" className='w-full' disabled={isPending}>Submit</Button>
            </form>
        </Form>
    </ProfileCard>
  )
}

export default ProfileForm