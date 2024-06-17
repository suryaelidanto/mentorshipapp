export interface UserInfoEntity {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
