"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { ACCEPTED_IMAGE_MIME_TYPES, fileEnum, MAX_IMAGE_SIZE } from "@/lib/zod/FileSchema";
import { ACCEPTED_VIDEO_MIME_TYPES, MAX_VIDEO_SIZE } from "@/lib/zod/FileSchema";
import { validatedRequest } from "@/lib/auth";
import { GetSignedURLParams, SignedURLResponse } from "@/types";
import prisma from "@/db";


const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketRegion) {
  throw new Error("Missing required environment variable bucket region");
}
if (!accessKeyId) {
  throw new Error("Missing required environment variable access key id");
}
if (!secretAccessKey) {
  throw new Error("Missing required environment variable secret access Key");
}
if (!bucketName) {
  throw new Error("Missing required environment variable bucket name");
}

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export async function getSignedURL({
  fileType,
  fileSize,
  checksum,
  uploadType,
}: GetSignedURLParams): Promise<SignedURLResponse> {
  const { session } = await validatedRequest();

  if (!session) {
    return {
      failure: "Not Authenticated",
    };
  }



  let maxFileSize: number;
  let acceptedMimeTypes: string[];
  let keyPrefix: string;

  switch (uploadType) {
    case "image":
      maxFileSize = MAX_IMAGE_SIZE;
      acceptedMimeTypes = ACCEPTED_IMAGE_MIME_TYPES;
      keyPrefix = "";
      break;
    case "video":
      maxFileSize = MAX_VIDEO_SIZE;
      acceptedMimeTypes = ACCEPTED_VIDEO_MIME_TYPES;
      keyPrefix = "";
      break;
    case "profileImage":
      maxFileSize = MAX_IMAGE_SIZE;
      acceptedMimeTypes = ACCEPTED_IMAGE_MIME_TYPES;
      keyPrefix = "profile-images/";
      break;
    default:
      return {
        failure: "Invalid upload type",
      };
  }

  if (fileSize > maxFileSize) {
    return {
      failure: `File size should be less than ${maxFileSize / (1024 * 1024)}MB`,
    };
  }

  const isValidMimeType = acceptedMimeTypes.includes(fileType);
  if (!isValidMimeType) {
    return {
      failure: "Invalid file type",
    };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${keyPrefix}${generateFileName()}`,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.userId,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 180,
  });

  const userProfile = await prisma.profile.findUnique({
    where: {
      userId: session.userId
    }
  })
  

  switch (uploadType) {
    case "image":
      if (!userProfile) {
        return {
          failure: "User has not created Profile"
        }
    }
       const ideaImage = await prisma.image.create({
        data: {
          url: signedURL,
          profileId: userProfile.id,
          type: "Image"
        }
      })
        const imageId = ideaImage.id
        return {
          success: {
            url : signedURL,
            id:   imageId
          }
        };
      ///
      case "video":
        if (!userProfile) {
          return {
            failure: "User has not created Profile"
          }
      }
        const ideaVideo = await prisma.video.create({
        data: {
          url: signedURL,
        }
      })
        const videoId =  ideaVideo.id
        return {
          success: {
            url : signedURL,
            id  : videoId
          }
        }
      ///
      case "profileImage":
       const profileImage = await prisma.image.create({
        data: {
          url: signedURL,
          type: "profileImage"
        }
      })
         const profileImageId = profileImage.id
         return {
          success: {
            url : signedURL,
            id  : profileImageId
          }
        }
      default: 
        return {
          failure: "Failed to upload the image"
        }
  }

}