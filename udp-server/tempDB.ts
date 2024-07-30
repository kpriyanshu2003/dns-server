import { DNSDatabase } from "./src/@types/DNS";

export const db: DNSDatabase = {
  "priyanshu.dev": {
    type: "A",
    data: "1.1.1.1",
  },
  "kpriyanshu2003.dev": {
    type: "CNAME",
    data: "priyanshu.dev",
  },
};
