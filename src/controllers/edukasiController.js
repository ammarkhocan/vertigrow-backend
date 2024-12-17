import { connectToDatabase } from "../config/database.js";
import path from "path";
import fs from "fs";

// Get all edukasi
export const getAllEdukasi = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM edukasi");
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get edukasi by ID
export const getEdukasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM edukasi WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Edukasi not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk mendapatkan gambar edukasi berdasarkan ID
export const getEdukasiImage = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM edukasi WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Edukasi not found" });
    }

    // Buat path gambar dengan pengecekan tambahan
    const imagePath = path.join(
      process.cwd(), // Menggunakan direktori kerja saat ini
      "src",
      "uploads",
      "edukasi",
      rows[0].thumbnail
    );

    // Logging untuk memastikan path benar
    console.log("Path Gambar:", imagePath);
    console.log("File Exists:", fs.existsSync(imagePath));

    // Periksa apakah file gambar ada
    if (fs.existsSync(imagePath)) {
      res.setHeader("Content-Type", "image/jpeg"); // Sesuaikan tipe MIME jika perlu
      return res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    // Tampilkan error lebih detail di respons
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
