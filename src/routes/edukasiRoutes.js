import express from "express";
// import {
//   getAllLimbah,
//   getLimbahById,
//   getLimbahImage,
// } from "../controllers/limbahController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  getAllEdukasi,
  getEdukasiById,
  getEdukasiImage,
} from "../controllers/edukasiController.js";

const router = express.Router();

// Get all limbah
router.get("/", getAllEdukasi);

// Get limbah by ID
router.get("/:id", getEdukasiById);

// Get limbah image by ID
router.get("/:id/image", getEdukasiImage);

export default router;
