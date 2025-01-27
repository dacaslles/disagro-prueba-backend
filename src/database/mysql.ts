import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "",
  process.env.MYSQL_USER || "",
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: Number(process.env.MYSQL_PORT) || 3306,
    logging: false
  }
);

export default sequelize;