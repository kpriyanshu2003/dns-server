import mongoose from "mongoose";
import { DNSRecordEnum, IDNSRecord } from "../@types/DNS";

const dnsRecordSchema = new mongoose.Schema<IDNSRecord>(
  {
    domainId: { type: mongoose.Schema.Types.ObjectId, ref: "Domain" },
    type: {
      type: String,
      required: true,
      enum: DNSRecordEnum,
    },
    value: { type: String, required: true },
    ttl: { type: Number, default: 3600 },
    priority: {
      type: Number,
      required: function (this: IDNSRecord) {
        return this.type === DNSRecordEnum.MX;
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDNSRecord>("DNSRecord", dnsRecordSchema);
