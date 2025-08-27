import express from "express";
import { signup, login , logout , getProfile} from "../controllers/AuthController.js";
import { protect } from "../middlewares/aurhMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",protect, getProfile);

export default router;
