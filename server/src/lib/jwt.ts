import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const secretKey = process.env.JWT_SECRET || "";

export function generateToken(payload: object) {
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return { error: err.message };
    return { decoded };
  });
}
