import express from "express";
import { getInternships } from "../controllers/internshipController.js";

const router = express.Router();

// GET /api/internships
router.get("/", getInternships);

export default router;
