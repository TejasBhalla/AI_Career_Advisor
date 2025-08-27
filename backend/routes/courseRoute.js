import express from "express";
import { getYouTubeCourses } from "../controllers/courseController.js";
const router = express.Router();

router.get("/youtube/:skill", getYouTubeCourses);

export default router;