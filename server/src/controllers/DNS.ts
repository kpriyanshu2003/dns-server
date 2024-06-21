import { Request, Response } from "express";

export const resolveDNS = async (req: Request, res: Response) => {
  try {
    const { domain } = req.query;
    if (!domain)
      return res
        .status(400)
        .send({ error: "Domain query parameter is required" });

    const record = db[domain as string];
    if (!record) return res.status(404).send({ error: "Domain not found" });

    res.send({
      success: true,
      resolve: {
        domain: domain,
        type: record.type,
        data: record.data,
        class: "IN",
        ttl: 300,
      },
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};
