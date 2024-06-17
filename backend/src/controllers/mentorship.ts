import { Request, Response } from "express";
import * as mentorshipService from "@/services/mentorship";
import { ClerkJWTPayload } from "@/types/jwt";

export const getAllMentorships = async (req: Request, res: Response) => {
  const mentorships = await mentorshipService.getAllMentorships();
  res.json(mentorships);
};

export const getMentorshipById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const mentorship = await mentorshipService.getMentorshipById(id);
  if (mentorship) {
    res.json(mentorship);
  } else {
    res.status(404).json({ message: "Mentorship not found" });
  }
};

export const createMentorship = async (req: Request, res: Response) => {
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
  const data = {
    ...req.body,
    userId: userPayload.sub,
  };
  const mentorship = await mentorshipService.createMentorship(data);
  res.status(201).json(mentorship);
};

export const updateMentorship = async (req: Request, res: Response) => {
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

  if (user?.userId !== userPayload.sub) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const data = req.body;
  const mentorship = await mentorshipService.updateMentorship(id, data);
  res.json(mentorship);
};

export const deleteMentorship = async (req: Request, res: Response) => {
  const userPayload = res.locals.user as ClerkJWTPayload;

  const user = await mentorshipService.getMentorshipById(
    parseInt(req.params.id),
  );

  if (user?.userId !== userPayload.sub) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const id = parseInt(req.params.id);
  await mentorshipService.deleteMentorship(id);
  res.status(204).send();
};
