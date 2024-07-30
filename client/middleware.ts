import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("token")?.value;
  const redirectUrl = new URL("/auth/login", request.url);
  redirectUrl.searchParams.set("redirect", request.url);

  if (!session) return NextResponse.redirect(redirectUrl);

  try {
    const payload = jwtDecode(session);
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime)
      return NextResponse.redirect(redirectUrl);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ["/dashboard", "/register", "/dns", "/resolve", "/settings"],
};
