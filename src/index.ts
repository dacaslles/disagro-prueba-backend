import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router";
import sequelize from "./database/mysql";

//dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

sequelize
  .sync()
  .then(() => {
      console.log("Conexión a base de datos exitosa");
      app.listen(PORT, () => {
          console.log(`Servidor escuchando en el puerto ${PORT}`);
      });
  })
  .catch((err) => {
      console.error("Error al conectarse a la base de datos:", err);
  });