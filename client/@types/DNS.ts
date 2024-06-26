export enum DNSRecordEnum {
  None = " ",
  A = "A",
  CNAME = "CNAME",
  MX = "MX",
  TXT = "TXT",
  SRV = "SRV",
  AAAA = "AAAA",
  NS = "NS",
}

export interface IDNSRecord {
  _id: string;
  name: string;
  type: DNSRecordEnum;
  data: string;
  ttl?: number;
  priority?: number;
}
