/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Mentorship` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Mentorship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentorship" DROP COLUMN "mentorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "contactLink" DROP NOT NULL,
ALTER COLUMN "meetingLink" DROP NOT NULL;
