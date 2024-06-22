import express from "express";
const router = express.Router();
import {
  deleteDNSRecord,
  deleteDomain,
  getDNSRecordbyId,
  getDNSRecords,
  getDomainbyId,
  getDomains,
  registerDNSRecords,
  registerDomain,
  resolveDNS,
  updateDNSRecord,
  updateDomain,
} from "../controllers/DNS";

router.get("/resolve", resolveDNS);

router.get("/d", getDomains);
router.get("/d/:id", getDomainbyId);
router.get("/dns", getDNSRecords);
router.get("/dns/:id", getDNSRecordbyId);

router.post("/d", registerDomain);
router.post("/dns", registerDNSRecords);

router.put("/d", updateDomain);
router.put("/dns", updateDNSRecord);

router.delete("/d", deleteDomain);
router.delete("/dns", deleteDNSRecord);

export default router;
