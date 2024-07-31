import express from "express";
const router = express.Router();
import { resolveDNS } from "../controllers/Resolve";

router.get("/", resolveDNS);

export default router;
