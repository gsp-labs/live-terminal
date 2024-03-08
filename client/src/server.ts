import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const path = require("path");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/static", express.static(path.join(__dirname, "../../dist/")));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
