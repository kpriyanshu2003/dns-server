import mongoose from "mongoose";

const domains = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    dnsRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "DNSRecord" }],
  },
  { timestamps: true }
);

export default mongoose.model("Domain", domains);
