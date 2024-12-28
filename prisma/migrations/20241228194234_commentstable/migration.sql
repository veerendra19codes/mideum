-- CreateTable
CREATE TABLE "MComments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "MComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MComments" ADD CONSTRAINT "MComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MComments" ADD CONSTRAINT "MComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "MPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
