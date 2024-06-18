import * as userInfoService from "@/services/user-info";
import { ClerkJWTPayload } from "@/types/jwt";
import { Request, Response } from "express";

export const check = async (req: Request, res: Response) => {
  try {
    const userPayload = res.locals.user as ClerkJWTPayload;
    const check = await userInfoService.check(userPayload.sub);
    res.json(check);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
