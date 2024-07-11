import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { ImagePlus, MonitorPlay } from 'lucide-react'
import Image from 'next/image'
import IdeaFormWrapper from './ideaFormWrapper'
import MultipleSelector from '../ui/multipleSelector'
import { AutosizeTextarea } from '../ui/AutosizeTextarea'
import mockCategorySearch from '@/lib/helpers/mockCategorySearch'
import mockTagSearch from '@/lib/helpers/mocktagsSearch'
import { useForm } from 'react-hook-form'
import { IdeaSchema } from '@/lib/zod/ideaSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ideaSubmitting } from '@/app/actions/ideaSubmition'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { categoriesOption, tagsOption } from '@/lib/constant/options'
import computeSHA256 from '@/lib/helpers/computeSHA256'
import axios from "axios"
import getSignedImageURL from '@/app/actions/getsignedImageURL'
import getSignedVideoURL from '@/app/actions/getSignedVideoURL'


const IdeaForm = () => {
  const router = useRouter()
  const [previewVideo, setPreviewVideo] = useState<string | ArrayBuffer |null>(null)
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer |null>(null)

  const form = useForm<z.infer<typeof IdeaSchema>>({
    resolver: zodResolver(IdeaSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      video: "",
      categories: [],
      tags: [],
    }
})

  const onDropImage = async(acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if(file) {
      try {
        const reader = new FileReader()
        console.log("uploading image")
        const imageId = await handleImageUpload(file)
        console.log("image has been uploaded")
        reader.onload = () => setPreviewImage(reader.result)
        reader.readAsDataURL(file)
        form.setValue("image", imageId)
        form.clearErrors("image")
        console.log("image has been rendered")
      } catch (error) {
        throw new Error("failed to load image")
      }
    } else {
      throw new Error("File is not provided")
    }
     [form]
  
  }

const onDropVideo = async(acceptedFiles: File[]) => {
  const file = acceptedFiles[0]
    if(file) {
      try {
        const reader = new FileReader()
        console.log("uploading video")
        const videoId = await handleVideoUpload(file)
        console.log("video has been uploaded")
        reader.onload = () => setPreviewVideo(reader.result)
        reader.readAsDataURL(file)
        form.setValue("video", videoId)
        form.clearErrors("video")
        console.log("video has been rendered")
      } catch (error) {
        throw new Error("failed to load image")
      }
    } else {
      throw new Error("File is not provided")
    }
    [form]
}

const {
  getRootProps: getImageRootProps,
  getInputProps: getImageInputProps,
  isDragActive: isImageDragActive,
  fileRejections: imageFileRejections
} = useDropzone({
  onDrop: onDropImage,
  maxFiles: 1,
  maxSize: 4 * 1024 * 1024,
  accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
});

const {
  getRootProps: getVideoRootProps,
  getInputProps: getVideoInputProps,
  isDragActive: isVideoDragActive,
  fileRejections: videoFileRejections
} = useDropzone({
  onDrop: onDropVideo,
  maxFiles: 1,
  maxSize: 60 * 1024 * 1024,
  accept: { "video/mp4": [] },
});

const handleImageUpload = async(file: File) => {
   const signedURLResult = await getSignedImageURL({
     fileType : file.type,
     fileSize: file.size,
     checksum : await computeSHA256(file)
   })

   if(signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure)
   }

   const { url, imageId} = signedURLResult.success

   await axios(url, {
      method: "put",
      data: file,
      headers: {
        "Content-Type": file.type
      }
   })
   
   return imageId
  }

  const handleVideoUpload = async(file: File) => {
    const signedURLResult = await getSignedVideoURL({
      fileType : file.type,
      fileSize: file.size,
      checksum : await computeSHA256(file)
    })
 
    if(signedURLResult.failure !== undefined) {
       throw new Error(signedURLResult.failure)
    }
 
    const { url, videoId} = signedURLResult.success
 
    await axios(url, {
       method: "put",
       data: file,
       headers: {
         "Content-Type": file.type
       }
    })
    
    return videoId
   }

const onIdeaSubmit = async (values: z.infer<typeof IdeaSchema>) => {
    console.log(values)
      await ideaSubmitting(values).then((res) => {
        if(res.success){
           form.reset()
           setPreviewImage(null)
           router.push("/")
         } else if (res.error) {
          console.log(res.error)
         }
    })
}


  return (
    <div className="flex justify-center items-center">   
        <IdeaFormWrapper>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onIdeaSubmit)} className="space-y-4"> 
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-4 w-[450px] justify-start">
            <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel
                className={`${
                  imageFileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || imageFileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getImageRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                >
                  {previewImage && (
                    <Image
                      src={previewImage as string}
                      alt="Uploaded image"
                      width={250}
                      height={250}
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${previewImage ? "hidden" : "block"}`}
                  />
                  <Input {...getImageInputProps()} 
                        type="file" 
                        accept='image/jpeg, image/png, image/webp, image/jpg'
                        />
                  {isImageDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {imageFileRejections.length !== 0 && (
                  <p>
                    Image must be less than 4MB and of type png, jpg, or jpeg
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
                 <FormLabel htmlFor='description'>Description</FormLabel>
                 <FormControl>
                      <AutosizeTextarea 
                          id="description"
                          placeholder='Enter the description of your idea' 
                          {...field} />
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="categories"
            render={({field}) => (
              <FormItem>
                 <FormLabel>Categories</FormLabel>
                 <FormControl>
                 <MultipleSelector
                      onSearch={async (value) => {
                        const res = await mockCategorySearch(value);
                        return res;
                      }}
                      defaultOptions={categoriesOption}
                      creatable
                      placeholder="trying to search 'a' to get more options..."
                      loadingIndicator={
                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                      }
                      emptyIndicator={
                        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                          no results found.
                        </p>
                      }
                    />
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="tags"
            render={({field}) => (
              <FormItem>
                 <FormLabel>tags</FormLabel>
                 <FormControl>
                 <MultipleSelector
                     {...field}
                      onSearch={async (value) => {
                        const res = await mockTagSearch(value);
                        return res;
                      }}
                      defaultOptions={tagsOption}
                      creatable
                      placeholder="trying to search 'a' to get more options..."
                      loadingIndicator={
                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                      }
                      emptyIndicator={
                        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                          no results found.
                        </p>
                      }
                    />
                 </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
          </div>
         <FormField
          control={form.control}
          name="video"
          render={() => (
            <FormItem className="mx-auto">
              <FormLabel
                className={`${
                  videoFileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your video
                  <span
                    className={
                      form.formState.errors.image || videoFileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getVideoRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground h-[650px]"
                >
                  {previewVideo && (
                    <video width="250" height="750" controls><source src={previewVideo as string} type="video/mp4"/></video>
                  )}
                  <MonitorPlay
                    className={`size-40 ${previewVideo ? "hidden" : "block"}`}
                  />
                  <Input {...getVideoInputProps()} 
                        type="file" 
                        accept='video/mp4'
                        />
                  {isVideoDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an video to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {videoFileRejections.length !== 0 && (
                  <p>
                    Video must be less than 60MB and of type mp4
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        </div>
        </form>
      </Form>
      </IdeaFormWrapper>
    </div>
  )
}

export default IdeaForm
