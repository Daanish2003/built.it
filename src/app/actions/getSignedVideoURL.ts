"use server"
import { validateRequest } from "@/lib/auth/validateRequest"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import db from "@/db"
import { videos } from "@/db/schema"
import { generateId } from "lucia"


export default async function getSignedVideoURL({
    fileType,
    fileSize,
    checksum
}: GetSignedURLParams): Promise<SignedVideoURLResponse> {
    const { session } = await validateRequest()
    if(!session) {
        return {
            failure: "Not Authenticated"
        }
    }

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
        }
    })

    const acceptedTypes = [
        "video/mp4"
    ]

    const maxFileSize = 60 * 1024 * 1024

    if (!acceptedTypes.includes(fileType)) {
        return { failure: "Invalid file type"}
    }

    if (fileSize > maxFileSize) {
        return { failure: "File too large"}
    }

    const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: generateFileName(),
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: session.userId
        }
    })

    const signedURL = await getSignedUrl(s3, putObjectCommand , {
        expiresIn: 180
    })

    const video = {
        id: generateId(15),
        videoUrl: signedURL.split("?")[0]
    }

    const videoResult = await db.insert(videos).values(video).returning()
    return {
        success: { url: signedURL, videoId: videoResult[0].id}
    }
}