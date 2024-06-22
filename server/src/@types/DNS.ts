import mongoose from "mongoose";

export interface DNSRecord {
  type: string;
  data: string;
}

export interface DNSDatabase {
  [key: string]: DNSRecord;
}

export interface IDNSRecord extends mongoose.Document {
  domainId: mongoose.Schema.Types.ObjectId;
  type: DNSRecordEnum;
  data: string;
  ttl?: number;
  priority?: number;
}

export enum DNSRecordEnum {
  A = "A",
  CNAME = "CNAME",
  MX = "MX",
  TXT = "TXT",
  SRV = "SRV",
  AAAA = "AAAA",
  NS = "NS",
}
