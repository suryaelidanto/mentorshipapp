import { UserInfoEntity } from "./user-info";

export interface MentorshipEntity {
  id: number;
  position?: string | null;
  institution?: string | null;
  description?: string | null;
  contactLink?: string | null;
  meetingLink?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userInfoId?: string | null;
  userInfo: UserInfoEntity;
}
