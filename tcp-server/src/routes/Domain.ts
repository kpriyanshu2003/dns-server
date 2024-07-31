import express from "express";
import {
  deleteDomain,
  getDomainbyId,
  getDomains,
  registerDomain,
  updateDomain,
} from "../controllers/Domain";
const router = express.Router();

router.post("/", registerDomain);
router.get("/", getDomains);
router.get("/:id", getDomainbyId);
router.put("/:id", updateDomain);
router.delete("/:id", deleteDomain);

export default router;