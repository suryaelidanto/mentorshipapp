/*
  Warnings:

  - You are about to drop the `Mentorship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mentorship";

-- CreateTable
CREATE TABLE "mentorships" (
    "id" SERIAL NOT NULL,
    "position" TEXT,
    "institution" TEXT,
    "description" TEXT,
    "contactLink" TEXT,
    "meetingLink" TEXT,
    "userInfoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_infos" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_infos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "user_infos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
