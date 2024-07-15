"use client"
import React, { useState, useTransition } from 'react'
import AuthCard from './authCard'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { RegisterSchema } from '@/lib/zod/registerSchema'
import Register from '@/actions/register'
import FormError from './formError'
import { FormSuccess } from './formSuccess'
import { useRouter } from 'next/navigation'



const RegisterForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
 const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
 })

 const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
        Register(values).then((data) => {
        if(data.error) {
          console.log(data.error)
          setError(data.error)
        } else {
          setSuccess(data.success)
          router.push("/profile")
        }
      });
    });
    
 }

       
  return (
    <AuthCard
      cardTitle='Signup'
      cardDescription='create an new account'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Login'
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              control = {form.control}
              name="email"
              render ={({field}) => (
                <FormItem>
                   <FormLabel>Email</FormLabel>
                   <FormControl>
                      <Input
                         disabled={isPending} 
                         type="email" 
                         placeholder='example@gmail.com' 
                         {...field}/>
                   </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name="password"
              render ={({field}) => (
                <FormItem>
                   <FormLabel>Password</FormLabel>
                   <FormControl>
                      <Input 
                          disabled={isPending}
                          type="password" 
                          placeholder='************' 
                          {...field}/>
                   </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name="confirmPassword"
              render ={({field}) => (
                <FormItem>
                   <FormLabel>Confirm Password</FormLabel>
                   <FormControl>
                      <Input 
                         disabled={isPending}
                         type="password" 
                         placeholder='*************' 
                         {...field}
                         />
                   </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
          </form>
        </Form>  
    </AuthCard>
  )
}

export default RegisterForm