import { JWTPayload, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "";

export async function verifyToken(token: string) {
  let result: {
    verified: JWTPayload | null;
    error: null | Error;
  } = {
    verified: null,
    error: null,
  };
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    result.verified = verified.payload as JWTPayload;
  } catch (err: any) {
    console.error(err);
    result.error = err.message;
  }
  return result;
}
