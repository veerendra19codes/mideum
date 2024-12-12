-- AlterTable
ALTER TABLE "MPost" ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "MLikes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "MLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MBookmarks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "MBookmarks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MLikes" ADD CONSTRAINT "MLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MLikes" ADD CONSTRAINT "MLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "MPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MBookmarks" ADD CONSTRAINT "MBookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MBookmarks" ADD CONSTRAINT "MBookmarks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "MPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
