import { Request, Response } from "express";
import DomainModel from "../model/Domain";
import DNSRecordModel from "../model/DNSRecord";
import mongoose from "mongoose";
import { CustomRequest } from "../@types/Express";

export const registerDNSRecords = async (req: Request, res: Response) => {
  try {
    const data = req.body;

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

export const getDNSRecords = async (req: CustomRequest, res: Response) => {
  try {
    const records = await DNSRecordModel.find({});
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
