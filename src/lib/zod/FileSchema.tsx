import { z } from "zod";

export const MAX_IMAGE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_VIDEO_SIZE = 1024 * 1024 * 50;
export const ACCEPTED_VIDEO_MIME_TYPES = [
  "video/mp4",
];

export const fileEnum = ["image", "video", "profileImage"] as const;

export const FileSchema = z.instanceof(File).refine((file) => {
  if (ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
    return file.size <= MAX_IMAGE_SIZE, "Image size should be less than 5MB";
  }
  if (ACCEPTED_VIDEO_MIME_TYPES.includes(file.type)) {
    return file.size <= MAX_VIDEO_SIZE, "Video size should be less than 50MB";
  }
  return false;
}, "Invalid file size or type");

export const TypedFileSchema = z.object({
  type: z.enum(fileEnum),
  file: FileSchema.refine((file) => {
    const type = file.type;
    if (ACCEPTED_IMAGE_MIME_TYPES.includes(type)) {
      return ACCEPTED_IMAGE_MIME_TYPES.includes(type), "Invalid Image Type";
    }
    if (ACCEPTED_VIDEO_MIME_TYPES.includes(type)) {
      return ACCEPTED_VIDEO_MIME_TYPES.includes(type), "Invalid Video Type";
    }
    return false;
  }, "Invalid file type")
});

export const ImageSchema = z.object({
  type: z.literal("image"),
  file: z.instanceof(File).refine((file) => file.size <= MAX_IMAGE_SIZE, "Image size should be less than 5MB")
                          .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), "Invalid Image Type")
});

export const VideoSchema = z.object({
  type: z.literal("video"),
  file: z.instanceof(File).refine((file) => file.size <= MAX_VIDEO_SIZE, "Video size should be less than 50MB")
                          .refine((file) => ACCEPTED_VIDEO_MIME_TYPES.includes(file.type), "Invalid Video Type")
});
