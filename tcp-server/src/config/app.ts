import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import compress from "compression";
import helmet from "helmet";

import router from "../routes";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3300;

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((req: Request, res: Response) =>
  res.json({ message: "DNS Server APi" })
);

export const startExpressServer = () => {
  app.listen(port, () =>
    console.log("Express.js Server running on localhost:" + port)
  );
};
