import { Request, Response } from "express";
import DomainModel from "../model/Domain";

export const resolveDNS = async (req: Request, res: Response) => {
  try {
    const { domain } = req.query;
    if (!domain)
      return res
        .status(400)
        .send({ message: "Domain query parameter is required" });

    const record = await DomainModel.findOne({ name: domain }).populate({
      path: "dnsRecords",
      select: "type data ttl priority updatedAt",
    });
    if (!record)
      return res
        .status(404)
        .send({ success: false, message: "Domain not found" });

    res.send({
      success: true,
      domain: record.name,
      records: record.dnsRecords,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};
