import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("token");
  if (!session || !session.value || !process.env.secretKey)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  const decodedToken = jwt.verify(session.value, process.env.secretKey);
  if (
    decodedToken &&
    typeof decodedToken === "object" &&
    "exp" in decodedToken
  ) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp > currentTime)
      return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/dashboard"],
};
