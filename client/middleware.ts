import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jose";

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

function isTokenExpired(exp: number | undefined) {
  return exp && exp < Date.now() / 1000;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return redirectToLogin(request);

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return redirectToLogin(request);

  try {
    const { verified, error } = await verifyToken(token);
    if (error) return redirectToLogin(request);
    if (!verified) return redirectToLogin(request);
    if (isTokenExpired(verified.exp)) return redirectToLogin(request);
    return NextResponse.next();
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: ["/dashboard", "/register", "/domains", "/resolve", "/settings"],
};
