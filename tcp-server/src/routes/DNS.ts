import express from "express";
const router = express.Router();
import {
  deleteDNSRecord,
  getDNSRecordbyId,
  getDNSRecordbyName,
  getDNSRecords,
  registerDNSRecords,
  updateDNSRecord,
} from "../controllers/DNS";

router.post("/", registerDNSRecords);
router.get("/", getDNSRecords);
router.get("/:id", getDNSRecordbyId);
router.get("/n/:id", getDNSRecordbyName);
router.put("/:id", updateDNSRecord);
router.delete("/:id", deleteDNSRecord);

export default router;
