DROP TABLE "comments";--> statement-breakpoint
DROP TABLE "likes";--> statement-breakpoint
DROP TABLE "views";--> statement-breakpoint
ALTER TABLE "ideas" DROP COLUMN IF EXISTS "image_url";--> statement-breakpoint
ALTER TABLE "ideas" DROP COLUMN IF EXISTS "tags";