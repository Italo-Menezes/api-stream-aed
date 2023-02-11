import { Sequelize } from "sequelize";
import dotenv from "dotenv";  

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "database-1.cvmvqavlrf07.us-east-1.rds.amazonaws.com",
  port: 3306,
  database: "ead_api",
  username: "admin",
  password:process.env.SENHA_BANCO_AWS,
  define: {
    underscored: true
  }
})