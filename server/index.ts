import dgram from "dgram";
const server = dgram.createSocket("udp4");
import express, { Request, Response } from "express";
import dnsPacket, { Packet, Question, Answer } from "dns-packet";

import { db } from "./tempDB";

const port = 3300;
const udpPort = 8053;
const app = express();

server.on("error", (err: Error) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  const packet = dnsPacket.decode(msg) as Packet;

  if (!packet.questions || packet.questions.length === 0)
    return console.error("No questions found in the DNS packet.");

  const question: Question = packet.questions[0];
  const ipFromDB = db[question.name];

  if (!ipFromDB) return console.error(`No record found for ${question.name}`);

  const answer: Answer = {
    class: "IN",
    name: question.name,
    ttl: 300,
    type: ipFromDB.type as any, // Ensure this matches dnsPacket's expected types
    data: ipFromDB.data,
  };

  const response = dnsPacket.encode({
    id: packet.id,
    type: "response",
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: packet.questions,
    answers: [answer],
  });

  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) console.error("Failed to send response:", err);
  });
});

server.bind(udpPort, () =>
  console.log(`UDP server running on localhost:${udpPort}`)
);

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

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
