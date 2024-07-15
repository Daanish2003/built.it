export const uploadFileType = async (file: File) => {
    if(file.type.startsWith("image/")) {
      return "Image"
    }
    if(file.type.startsWith("video/")) {
      return "Video"
    }
    if(file.type.startsWith("image/")) {
      return ""
    }
  }