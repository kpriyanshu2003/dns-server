import express from "express";
const router = express.Router();

import AuthRoutes from "./Auth";
import UserRoutes from "./User";
import DNSRoutes from "./DNS";
import { authenticateUser } from "../middlewares/auth";

router.use("/auth", AuthRoutes);
router.use("/user", authenticateUser, UserRoutes);
router.use("/dns", authenticateUser, DNSRoutes);

export default router;
