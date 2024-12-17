import express from "express";
import {
  getAllLimbah,
  getLimbahById,
  getLimbahImage, // Pastikan untuk mengimpor fungsi ini
} from "../controllers/limbahController.js"; // Pastikan file path benar
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all limbah
router.get("/", getAllLimbah);

// Get limbah by ID
router.get("/:id", getLimbahById);

// Get limbah image by ID
router.get("/:id/image", getLimbahImage); // Endpoint baru untuk mengambil gambar limbah

export default router;
