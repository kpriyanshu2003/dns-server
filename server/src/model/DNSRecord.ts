import mongoose from "mongoose";

interface IDNSRecord extends mongoose.Document {
  type: "A" | "CNAME" | "MX" | "TXT" | "SRV" | "AAAA" | "NS";
  value: string;
  ttl?: number;
  priority?: number;
}

const dnsRecordSchema = new mongoose.Schema<IDNSRecord>(
  {
    type: {
      type: String,
      required: true,
      enum: ["A", "CNAME", "MX", "TXT", "SRV", "AAAA", "NS"],
    },
    value: { type: String, required: true },
    ttl: {
      type: Number,
      default: 3600, // Default TTL value in seconds
    },
    priority: {
      type: Number,
      required: function (this: IDNSRecord) {
        return this.type === "MX";
      }, // Priority is required for MX records
    },
  },
  { timestamps: true }
);

export const DNSRecord = mongoose.model<IDNSRecord>(
  "DNSRecord",
  dnsRecordSchema
);
