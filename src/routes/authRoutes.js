import express from "express";
import { register, login, getUserData } from "../controllers/authController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/daftar", register);

// Login route
router.post("/masuk", login);

// MainHero route (requires authentication)
router.get("/MainHero", verifyToken, getUserData);

export default router;
