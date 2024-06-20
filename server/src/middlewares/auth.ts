import { verifyToken } from "../lib/jwt.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["x-access-token"];
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const { decoded, error } = verifyToken(token);
    if (error)
      return res.status(403).json({ message: "Failed to authenticate token" });
    req.user = decoded;
    if (Date.now() >= decoded.exp * 1000)
      return res.status(406).json({ message: "Token expired" });
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};
