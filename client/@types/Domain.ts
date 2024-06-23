export interface AllDomainsBackendResponse {
  _id: string;
  userId: string;
  name: string;
  isVerified: boolean;
  dnsRecords: string[];
  createdAt: string;
  updatedAt: string;
}
