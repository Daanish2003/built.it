import computeSHA256 from "@/lib/helpers/computeSHA256"
import { fileEnum } from "@/lib/zod/FileSchema"
import { getSignedURL } from "../../actions/getSignedURL"
import axios from "axios"

export default async function handleFileUpload(file: File, uploadType: typeof fileEnum[number]) {
    const signedURLResult = await getSignedURL({
      fileType : file.type,
      fileSize: file.size,
      checksum : await computeSHA256(file),
      uploadType
    })

    if(signedURLResult.failure !== undefined) {
        throw new Error(signedURLResult.failure)
     }

     const { url, id} = signedURLResult.success

     await axios(url, {
        method: "put",
        data: file,
        headers: {
          "Content-Type": file.type
        }
     })
     
     return id
}