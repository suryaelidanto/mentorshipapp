import { Router } from "express";
import * as mentorshipController from "@/controllers/mentorship";
import { clerkAuthenticate } from "@/middlewares/clerk-authenticate";

const router = Router();

router.get("/", mentorshipController.getAllMentorships);
router.get("/:id", mentorshipController.getMentorshipById);
router.post("/", clerkAuthenticate, mentorshipController.createMentorship);
router.put("/:id", clerkAuthenticate, mentorshipController.updateMentorship);
router.delete("/:id", clerkAuthenticate, mentorshipController.deleteMentorship);

export default router;
