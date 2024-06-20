import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import compress from "compression";
import helmet from "helmet";

import router from "../routes";

dotenv.config();

const app = express();
const port = 3300;
const mongo_uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/dns-server";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", router);

app.use((req: Request, res: Response) =>
  res.json({ message: "DNS Server APi" })
);

export const startExpressServer = () => {
  mongoose
    .connect(mongo_uri)
    .then(() =>
      app.listen(port, () =>
        console.log("Server running on http://localhost:" + port)
      )
    )
    .catch((err: any) => console.log(err));
};
