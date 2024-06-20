import express from "express";
const router = express.Router();

import AuthRoutes from "./Auth";

router.use("/auth", AuthRoutes);

export default router;
