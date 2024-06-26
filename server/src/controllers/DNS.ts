import { Request, Response } from "express";
import DomainModel from "../model/Domain";
import DNSRecordModel from "../model/DNSRecord";
import { CustomRequest } from "../@types/Express";
import mongoose from "mongoose";

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

export const getDomains = async (req: Request, res: Response) => {
  try {
    const domains = await DomainModel.find();
    res.send({ success: true, domains });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const getDomainbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const domain = await DomainModel.findById(id);
    if (!domain)
      return res
        .status(404)
        .send({ success: false, message: "Domain not found" });

    res.send({ success: true, domain });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const getDNSRecords = async (req: Request, res: Response) => {
  try {
    const records = await DNSRecordModel.find();
    if (!records)
      return res
        .status(404)
        .send({ success: false, message: "Records not found" });
    res.send({ success: true, records });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const getDNSRecordbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const record = await DNSRecordModel.findById(id);
    if (!record) return res.status(404).send({ message: "Record not found" });

    res.send({ success: true, record });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

// Here name is Domain Name
export const getDNSRecordbyName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const record = await DNSRecordModel.aggregate([
      {
        $lookup: {
          from: "domains",
          localField: "domainId",
          foreignField: "_id",
          as: "domain",
        },
      },
      { $unwind: "$domain" },
      { $match: { "domain.name": id } },
    ]);

    if (!record) return res.status(404).send({ message: "Record not found" });

    res.send({ success: true, record });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};
// Create Domain + www for root
export const registerDomain = async (req: CustomRequest, res: Response) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });

    const domain = new DomainModel({
      userId: new mongoose.Types.ObjectId(req.user?.id),
      name,
    });
    await domain.save();
    res.send({ success: true, message: "Domain Created" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const registerDNSRecords = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    if (!data.domainId || !data.type || !data.data)
      return res
        .status(400)
        .send({ success: false, message: "domainId, type, data is required" });

    const domain = await DomainModel.findOne({ name: data.domainId });
    if (!domain)
      return res
        .status(404)
        .send({ success: false, message: "Domain not found" });

    const record = new DNSRecordModel({ ...data, domainId: domain._id });
    domain.dnsRecords.push(new mongoose.Types.ObjectId(record._id as string));

    await record.save();
    await domain.save();

    res.send({ success: true, message: "DNSRecord Created" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const updateDomain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const domain = await DomainModel.findById(id);
    if (!domain)
      return res
        .status(404)
        .send({ success: false, message: "Domain not found" });

    await domain.updateOne(data);

    res.send({ success: true, message: "Domain Updated" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const updateDNSRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const record = await DNSRecordModel.findById(id);
    if (!record)
      return res
        .status(404)
        .send({ success: false, message: "Record not found" });

    await record.updateOne(data);

    res.send({ success: true, message: "DNSRecord Updated" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

// Delete SubDomains + DNS Records + www SubDomain
export const deleteDomain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const domain = await DomainModel.findById(id);
    if (!domain)
      return res
        .status(404)
        .send({ success: false, message: "Domain not found" });

    await DNSRecordModel.deleteMany({ domainId: domain._id });
    await domain.deleteOne();

    res.send({ success: true, message: "Domain Deleted" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteDNSRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .send({ success: false, message: "Id parameter is required" });

    const record = await DNSRecordModel.findById(id);
    if (!record)
      return res
        .status(404)
        .send({ success: false, message: "Record not found" });

    await record.deleteOne();
    res.send({ success: true, message: "DNSRecord Deleted" });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, message: e.message });
  }
};
