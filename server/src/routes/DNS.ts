import express from "express";
const router = express.Router();
import { resolveDNS } from "../controllers/DNS";

router.get("/resolve", resolveDNS);

export default router;
