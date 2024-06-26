import express from "express";
const router = express.Router();
import {
  deleteDNSRecord,
  deleteDomain,
  getDNSRecordbyId,
  getDNSRecordbyName,
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
router.get("/dns/n/:id", getDNSRecordbyName);

router.post("/d", registerDomain);
router.post("/dns", registerDNSRecords);

router.put("/d/:id", updateDomain);
router.put("/dns/:id", updateDNSRecord);

router.delete("/d/:id", deleteDomain);
router.delete("/dns/:id", deleteDNSRecord);

export default router;
