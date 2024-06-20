import express from "express";
import { createUser, loginUser } from "../controllers/Auth";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/change-password", changePassword);

export default router;
