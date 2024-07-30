import { NextFunction, Request, Response } from "express";

import { CustomRequest } from "../@types/Express";
import { verifyToken } from "../lib/jwt";

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["x-access-token"];
    if (!authHeader || !(authHeader as string).startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = (authHeader as string).split(" ")[1];
    const { decoded, error } = verifyToken(token);
    if (error)
      return res.status(403).json({ message: "Failed to authenticate token" });
    req.user = decoded as CustomRequest["user"];
    if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000)
      return res.status(406).json({ message: "Token expired" });
    return next();
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};
