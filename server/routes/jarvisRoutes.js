import { Router } from "express";
import { getJarvisResponse } from "../controllers/jarvisController.js";
import { getJarvisStreamResponse } from "../controllers/jarvisStreamController.js"

const router = Router();

router.post("/", getJarvisResponse);
router.post("/stream", getJarvisStreamResponse);

export default router;