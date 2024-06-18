import { Router } from "express";
import * as userInfoController from "@/controllers/user-info";
import { clerkAuthenticate } from "@/middlewares/clerk-authenticate";

const router = Router();

router.get("/check", clerkAuthenticate, userInfoController.check);

export default router;
