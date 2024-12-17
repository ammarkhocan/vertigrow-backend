import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import edukasiRouter from "./routes/edukasiRoutes.js";
import limbahRouter from "./routes/limbahRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/edukasi", edukasiRouter); // Routes untuk edukasi
app.use("/limbah", limbahRouter); // Routes untuk limbah

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server berhasil dijalankan di PORT ${PORT}`);
});
