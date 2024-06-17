import { NextFunction, Request, Response } from "express";
import { verifyToken } from "@clerk/clerk-sdk-node";

export const clerkAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const secretKey = process.env.CLERK_SECRET_KEY;
    const token = req?.headers?.authorization?.split("Bearer ")[1] as string;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await verifyToken(token, {
      secretKey,
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.locals.user = user;
    next();
  } catch (error: unknown) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
