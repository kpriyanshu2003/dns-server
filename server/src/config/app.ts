import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "../../tempDB";

dotenv.config();

const app = express();
const port = 3300;
const mongo_uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/dns-server";

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the DNS Server");
});

app.get("/resolve", (req: Request, res: Response) => {
  const domain = req.query.domain as string;

  if (!domain)
    return res
      .status(400)
      .send({ error: "Domain query parameter is required" });

  const record = db[domain];

  if (!record) return res.status(404).send({ error: "Domain not found" });

  res.send({
    domain: domain,
    type: record.type,
    data: record.data,
  });
});

export const startExpressServer = () => {
  mongoose
    .connect(mongo_uri)
    .then(() =>
      app.listen(port, () =>
        console.log("Server running on http://localhost:" + port)
      )
    )
    .catch((err) => console.log(err));
};
