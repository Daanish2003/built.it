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



type SignedImageURLResponse = Promise<
  { failure?: undefined; success: { url: string, imageId: string } }| { failure: string; success?: undefined }>

  type SignedVideoURLResponse = Promise<
  { failure?: undefined; success: { url: string, videoId: string } }| { failure: string; success?: undefined }>

type GetSignedURLParams = {
    fileType: string
    fileSize: number
    checksum: string
  }
