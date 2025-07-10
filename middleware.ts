import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { TOKEN, TYPE } from "./constants";
import { routing } from "./i18n/routing";

// Setup internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // First: run intlMiddleware to get the response
  const response = intlMiddleware(request);

  const token = request.cookies.get(TOKEN)?.value;
  const type = request.cookies.get(TYPE)?.value;
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname.includes("/login");
  const isAdminPath = pathname.includes("/dashboard/admin");
  const isEmployeePath = pathname.includes("/dashboard/employee");

  // User not logged in and trying to access a page other than login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User is logged in
  if (token) {
    // Employee trying to access admin pages
    if (type === "employee" && isAdminPath) {
      return NextResponse.redirect(new URL("/dashboard/employee", request.url));
    }

    // Admin trying to access employee pages
    if (type === "admin" && isEmployeePath) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    // If user is logged in and tries to access the login page
    if (isLoginPage) {
      if (type === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      } else if (type === "employee") {
        return NextResponse.redirect(
          new URL("/dashboard/employee", request.url)
        );
      }
    }
  }

  // Finally, return the response from intlMiddleware
  return response;
}

// matcher covers all pages except api, static files, and next internals
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
