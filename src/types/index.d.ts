import { FilterEnum } from "zod"

interface AuthCard {
    cardTitle: string,
    cardDescription: string,
    backButtonHref: string,
    backButtonLabel: string,
    children: React.ReactNode
}

interface ActionResult {
    error: string | null,
    success: boolean,
    message: string | null
}

interface ideas{
    id: string,
    userId: string,
    title: string,
    description: string,
    createdAt: Date
}

interface IdeaType {
    ideas: ideas[]
}

type SignedURLResponse = Promise<
  { failure?: undefined; success: { url: string, id: number } }| { failure: string; success?: undefined }>


type GetSignedURLParams = {
    fileType: string
    fileSize: number
    checksum: string
    uploadType: z.infer<typeof fileEnum>
  }

type FormErrorProps = {
    message? : string
}

type objectCommandType = {
    bucketName : string,
    fileType   : string,
    fileSize   : number,
    checksum   : string
}


  