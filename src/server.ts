import express from "express";
import { sequelize } from "./database";
import { router } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

/* confg */
const port = process.env.PORT || 3000;  
const app = express();
app.use(express.static("public"))
app.use(express.json())
app.use(cors({
  
}))


/* routes */

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.listen(port, async () => {
  await sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  }).catch(err => {
    console.error("Unable to connect to the database:", err);
  });

  console.log(`Server started on port ${port} good`);
});
