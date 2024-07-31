import DomainModel from "../model/Domain";

export const resolveDNS = async (domain: string) => {
  try {
    if (!domain) return undefined;
    console.log("dns", domain);
    const record = await DomainModel.findOne({ name: domain }).populate({
      path: "dnsRecords",
      select: "type data ttl priority updatedAt",
    });

    console.log(record);
    if (!record) return undefined;
    return {
      success: true,
      domain: record.name,
      records: record.dnsRecords,
    };
  } catch (e: any) {
    console.error(e);
    return undefined;
  }
};
