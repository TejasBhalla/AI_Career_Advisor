import express from "express";
import { getCareerAdvice, getSkillAdvice } from "../controllers/aiController.js";
import { protect } from "../middlewares/aurhMiddleware.js";

const router = express.Router();

router.post("/career", getCareerAdvice);
router.post("/skills",protect, getSkillAdvice);

export default router;