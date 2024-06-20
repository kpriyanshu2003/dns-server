const dgram = require("node:dgram");
const dnsPacket = require("dns-packet");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

const db = {
  "piyushgarg.dev": {
    type: "A",
    data: "1.1.1.1",
  },
  "priyanshu.dev": {
    type: "CNAME",
    data: "hashnode.network",
  },
};

server.on("message", (msg, rinfo) => {
  const packet = dnsPacket.decode(msg);
  const ipFromDB = db[packet.questions[0].name];

  const ans = dnsPacket.encode({
    id: packet.id,
    type: "response",
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: packet.questions,
    answers: [
      {
        class: "IN",
        name: packet.questions[0].name,
        ttl: 300,
        type: ipFromDB.type,
        data: ipFromDB.data,
      },
    ],
  });

  server.send(ans, rinfo.port, rinfo.address);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8053, () => console.log("Server running on localhost:8053"));
