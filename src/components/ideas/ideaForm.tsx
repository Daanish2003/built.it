import React, { useCallback, useEffect, useState } from 'react'
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
import { useRecoilState } from 'recoil'
import { DropzoneOptions, useDropzone,} from 'react-dropzone'
import { ImagePlus } from 'lucide-react'

import Image from 'next/image'
import getSignedURL from '@/app/actions/getSignedUrl'



const IdeaForm = () => {
  // const [input, setInput] = useState('');
  // const [tags, setTags] = useState<string[]>([]);
  // const [isKeyReleased, setIsKeyReleased] = useState(false)
  const router = useRouter();
  const [_, setOpen] = useRecoilState(openState)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("")
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm<z.infer<typeof IdeaSchema>>({
      resolver: zodResolver(IdeaSchema),
      defaultValues: {
        title: "",
        description: "",
        image: new File([""], "filename")
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

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
  useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  const computeSHA256 = async (image: File) => {
    const buffer = await image.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    };

  const handleFileUpload = async(image: File) => {
    const signedURLResult = await getSignedURL({
      fileType: image.type, 
      fileSize:image.size, 
      checksum: await computeSHA256(image)
    })

    if(signedURLResult.failure !== undefined) {
      setStatusMessage("Failed")
      throw new Error(signedURLResult.failure)
    }

    const {url, imageId } = signedURLResult.success
    console.log({url})
    await fetch(url, {
      method: "PUT",
      body: image,
      headers: {
        "Content-Type": image.type,
      },
    });

    return imageId
 }





  const onSubmit = async (values: z.infer<typeof IdeaSchema>) => {
    setLoading(true)
    try {
      let imageId = undefined;
      if(values.image.size !== 0) {
        setStatusMessage("uploading...")
        imageId = await handleFileUpload(values.image)
      }

      setStatusMessage("Submitting Your Idea...")
      if(imageId !== undefined) {
        const {title, description} = values
        const content = {
          title: title,
          description: description
        }
        await ideaSubmitting(content, imageId).then((res) => {
          if(res.success){
             setOpen(false)
             setStatusMessage ("..successfully created idea")
             form.reset()
             setPreview(null)
             router.push("/")
           } else if (res.error) {
            setStatusMessage("Failed to create Idea")
            console.log(res.error)
           }
      })
      }
  } catch(error) {
    console.error(error)
    setStatusMessage("Post failed");
  } finally {
    setLoading(false)
  }
}
  
  return (
    <>   
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> 
        {statusMessage && (
          <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded relative">
            {statusMessage}
          </p>
        )}
	       <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[400px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} 
                        type="file" 
                        accept='image/jpeg, image/png, image/webp, image/jpg'
                        />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
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
