import React, { useState, useTransition } from 'react'
import AuthCard from './authCard'
import { Button } from '../ui/button'
import { redirect, useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import LoginSchema from '@/lib/zod/loginSchema'
import login from '@/actions/login'
import FormError from './formError'
import { FormSuccess } from './formSuccess'

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  
 const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
 })

 const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values)
    setError("")
    setSuccess("")
    
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          router.push('/')
        }
      });
    })
 }

       
  return (
    <AuthCard
      cardTitle='Login'
      cardDescription='Login into your account'
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account ? Register"
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              control = {form.control}
              name="email"
              render ={( {field}) => (
                <FormItem>
                   <FormLabel>Email</FormLabel>
                   <FormControl>
                      <Input 
                         disabled={isPending}
                         type="email" 
                         placeholder='example@gmail.com' 
                         {...field}
                         />
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
                          placeholder='********' 
                          {...field}
                          />
                   </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className='w-full'>Login</Button>
          </form>
        </Form>  
    </AuthCard>
  )
}

export default LoginForm