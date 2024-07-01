import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { IdeaSchema } from '@/lib/zod/ideaSchema'
import { zodResolver} from '@hookform/resolvers/zod'
import { z } from "zod"
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ideaSubmitting } from '@/app/actions/ideaSubmition'
import { useRouter } from 'next/navigation'

import { openState } from '@/lib/store/atom'
import { useRecoilState, useSetRecoilState } from 'recoil'
// import ImageDrop from './imageDrop'
// import { Badge } from '../ui/badge'
// import { useSession } from '@/providers/sessionProvider'
// import WarningCard from './warningCard'



const IdeaForm = () => {
  // const [input, setInput] = useState('');
  // const [tags, setTags] = useState<string[]>([]);
  // const [isKeyReleased, setIsKeyReleased] = useState(false)
  const router = useRouter();
  const [_, setOpen] = useRecoilState(openState)

  const form = useForm<z.infer<typeof IdeaSchema>>({
      resolver: zodResolver(IdeaSchema),
      defaultValues: {
        title: "",
        description: "",
        //image: "",
        //tags: [],
      }
  })

  // const onKeyDown = (e: React.KeyboardEvent) => {
  //   const { key } = e;
  //   const trimmedInput = input.trim()

  //   if(key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
  //     e.preventDefault();
  //     setTags(prevState => [...prevState, trimmedInput]);
  //     setInput(' ')
  //   }
  //   setIsKeyReleased(false);
  // };

  // const onKeyUp = () => {
  //   setIsKeyReleased(true);
  // }

  // const deleteTag = (index: number) => {
  //   setTags(prevState => prevState.filter((tag, i) => i !== index))
  // }


  const onSubmit = async (values: z.infer<typeof IdeaSchema>) => {
    await ideaSubmitting(values).then((res) => {
      if(res.success){
            setOpen(false)
            router.refresh()
      } else if (res.error) {
        console.log(res.error)
      }
    })
    
  }

  
  return (
    <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* <FormField 
            control={form.control}
            name="image"
            render={({field}) => (
              <FormItem>
                 <FormControl>
                   <ImageDrop />
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField 
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                 <FormLabel>Title</FormLabel>
                 <FormControl>
                    <Input placeholder='Enter the title' type="text" {...field} />
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                 <FormLabel>Description</FormLabel>
                 <FormControl>
                    <Textarea placeholder='Type your description here' {...field}/>
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField 
            control={form.control}
            name="tags"
            render={({field}) => (
              <FormItem>
                 <FormLabel>Tags</FormLabel>
                 <FormControl>
                   <>
                   <div className="grid grid-cols-4 gap-2">{tags.map((tag, index) => <div key={index}>
                      <Badge variant={"tag"}>{tag}
                      <button onClick={() => deleteTag(index)}>x</button></Badge>
                    </div>)}</div>
                   <Input  
                      placeholder="Enter a tag"
                      onKeyDown={onKeyDown}
                      onKeyUp={onKeyUp}
                      onChangeCapture={e => setInput(e.currentTarget.value)}
                   {...field}/>
                   </>
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default IdeaForm