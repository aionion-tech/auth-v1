import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { envConfig } from "./config";
import router from "./routers";
import { rootError } from "./middlewares/rootError.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth/api/v1", router);

app.get("/auth/echo", async (req: Request, res: Response) => {
  res.status(200).send("Hey auth!");
});

app.use(rootError);

app.listen(envConfig.SERVER.PORT, async () => {
  console.log(
    `[server]: Server is running at http://localhost:${envConfig.SERVER.PORT}`
  );
});
