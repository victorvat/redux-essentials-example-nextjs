-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,
    "is_new" BOOLEAN NOT NULL,

    CONSTRAINT "pk_notification" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_post" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "post_id" INTEGER NOT NULL,
    "thumbs_up" INTEGER NOT NULL,
    "hooray" INTEGER NOT NULL,
    "heart" INTEGER NOT NULL,
    "rocket" INTEGER NOT NULL,
    "eyes" INTEGER NOT NULL,

    CONSTRAINT "pk_reaction" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ifk_notification_post_post_id" ON "notification"("post_id");

-- CreateIndex
CREATE INDEX "ifk_post_user_user_id" ON "post"("user_id");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "fk_notification_post_post_id" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "fk_post_user_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "fk_reaction_post_post_id" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- Move sequences current value
SELECT setval('public.post_id_seq', 101, true);
SELECT setval('public.notification_id_seq', 101, true);
SELECT setval('public.user_id_seq', 101, true);