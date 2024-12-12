-- CreateTable
CREATE TABLE "MPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "MPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MProfile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "MUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MProfile_userId_key" ON "MProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MUser_email_key" ON "MUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MUser_username_key" ON "MUser"("username");

-- AddForeignKey
ALTER TABLE "MPost" ADD CONSTRAINT "MPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "MUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MProfile" ADD CONSTRAINT "MProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
