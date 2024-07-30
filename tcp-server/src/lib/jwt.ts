import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

config();
const secretKey = process.env.JWT_SECRET || "";

export function generateToken(payload: object) {
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}

export function verifyToken(token: string): {
  decoded?: JwtPayload;
  error?: string;
} {
  let result: { decoded?: JwtPayload; error?: string } = {};
  jwt.verify(
    token,
    secretKey,
    (err: any, decoded) =>
      (result = { decoded: decoded as JwtPayload, error: err })
  );
  return result;
}
