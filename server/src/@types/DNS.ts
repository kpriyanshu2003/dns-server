export interface DNSRecord {
  type: string;
  data: string;
}

export interface DNSDatabase {
  [key: string]: DNSRecord;
}
