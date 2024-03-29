import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: <string>process.env.JWT_SECRET });

  const { pathname } = req.nextUrl

  // Allow the request if the following is true...
  // 1) Its a request for next-auth sesion & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they dont have token AND are requesting a proctected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}