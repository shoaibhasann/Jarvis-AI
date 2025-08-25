import { Router } from "express";
import { getJarvisResponse } from "../controllers/jarvisController.js";

const router = Router();

router.post("/", getJarvisResponse);

export default router;