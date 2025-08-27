import express from "express";
import { getProgress, updateProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/:userId", getProgress);
router.post("/:userId", updateProgress);

export default router;
