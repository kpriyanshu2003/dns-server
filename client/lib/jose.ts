import { JWTPayload, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "";

interface UserJWTPayload extends JWTPayload {
  username: string;
}

export async function verifyToken(token: string) {
  let result: {
    verified: UserJWTPayload | null;
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
    result.verified = verified.payload as UserJWTPayload;
  } catch (err: any) {
    console.error(err);
    result.error = err.message;
  }
  return result;
}
