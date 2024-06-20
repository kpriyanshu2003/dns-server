// mongoose schema to be used, when a particular user saves hi domain using dns records such as A, CNAME etc and all its related info

import mongoose from "mongoose";

const domains = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    // isVerified: { type: Boolean, default: false },
    dnsRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "DNSRecord" }],
  },
  { timestamps: true }
);
