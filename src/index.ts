import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "El servidor se encuentra disponible." });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`server runing at http://localhost:${PORT}`);
});
