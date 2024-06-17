-- DropForeignKey
ALTER TABLE "mentorships" DROP CONSTRAINT "mentorships_userInfoId_fkey";

-- AddForeignKey
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "user_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
