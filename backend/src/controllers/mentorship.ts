import * as mentorshipService from "@/services/mentorship";
import { ClerkJWTPayload } from "@/types/jwt";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";

export const getAllMentorships = async (req: Request, res: Response) => {
  try {
    const mentorships = await mentorshipService.getAllMentorships();
    res.json(mentorships);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMentorshipById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const mentorship = await mentorshipService.getMentorshipById(id);
    if (mentorship) {
      res.json(mentorship);
    } else {
      res.status(404).json({ message: "Mentorship not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createMentorship = async (req: Request, res: Response) => {
  try {
    const userPayload = res.locals.user as ClerkJWTPayload;
    /*  #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                         $ref: "#/components/schemas/CreateMentorshipDTO"
                      }  
                  }
              }
          } 
      */
    const { id, firstName, lastName, imageUrl } =
      await clerkClient.users.getUser(userPayload.sub);

    const mentorship = await mentorshipService.createMentorship({
      ...req.body,
      userInfo: {
        id,
        firstName,
        lastName,
        imageUrl,
      },
    });
    res.status(201).json(mentorship);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMentorship = async (req: Request, res: Response) => {
  try {
    const userPayload = res.locals.user as ClerkJWTPayload;
    /*  #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                         $ref: "#/components/schemas/UpdateMentorshipDTO"
                      }  
                  }
              }
          } 
      */
    const id = parseInt(req.params.id);
    const user = await mentorshipService.getMentorshipById(
      parseInt(req.params.id),
    );

    if (user?.userInfoId !== userPayload.sub) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = req.body;
    const mentorship = await mentorshipService.updateMentorship(id, data);
    res.json(mentorship);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMentorship = async (req: Request, res: Response) => {
  try {
    const userPayload = res.locals.user as ClerkJWTPayload;

    const user = await mentorshipService.getMentorshipById(
      parseInt(req.params.id),
    );

    if (user?.userInfoId !== userPayload.sub) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const id = parseInt(req.params.id);
    await mentorshipService.deleteMentorship(id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
