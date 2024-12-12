/*
  Warnings:

  - You are about to drop the `MProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MProfile" DROP CONSTRAINT "MProfile_userId_fkey";

-- AlterTable
ALTER TABLE "MUser" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "MProfile";
