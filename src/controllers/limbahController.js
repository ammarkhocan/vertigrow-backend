import { connectToDatabase } from "../config/database.js";
import path from "path";
import fs from "fs";

// Get all limbah
export const getAllLimbah = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM limbah");
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get limbah by ID
export const getLimbahById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM limbah WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Limbah not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get limbah image by ID
export const getLimbahImage = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT thumbnail FROM limbah WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Limbah not found" });
    }

    const imagePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "limbah",
      rows[0].thumbnail
    );

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
