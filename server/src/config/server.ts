import dgram from "dgram";
import dnsPacket, { Packet, Question, Answer } from "dns-packet";
import { db } from "../../tempDB";

const udpPort = 8053;
const server = dgram.createSocket("udp4");

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

export const startUdpServer = () => {
  server.bind(udpPort, () =>
    console.log(`UDP server running on localhost:${udpPort}`)
  );
};
