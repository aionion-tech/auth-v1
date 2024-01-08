import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db/connect";
import { envConfig } from "./config";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
});

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${envConfig.SERVER.PORT}`
  );
});
