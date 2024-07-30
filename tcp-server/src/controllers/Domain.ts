import { Request, Response } from "express";
import DomainModel from "../model/Domain";
import DNSRecordModel from "../model/DNSRecord";
import { CustomRequest } from "../@types/Express";
import mongoose from "mongoose";

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
