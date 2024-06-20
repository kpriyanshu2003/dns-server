import express from "express";
const router = express.Router();

// app.get("/resolve", (req: Request, res: Response) => {
//   const domain = req.query.domain as string;

//   if (!domain)
//     return res
//       .status(400)
//       .send({ error: "Domain query parameter is required" });

//   const record = db[domain];

//   if (!record) return res.status(404).send({ error: "Domain not found" });

//   res.send({
//     domain: domain,
//     type: record.type,
//     data: record.data,
//   });
// });

export default router;
