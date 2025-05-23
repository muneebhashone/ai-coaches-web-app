import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "@/services/auth/auth.service";
import { routing } from "./src/i18n/routing";

// Create i18n middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle internationalization first
  console.log("[Middleware] Request:", request.url);
  // if url doesn't include locale and add locale to the url and redirect to the new url
  if (
    !routing.locales.some((locale) => request.nextUrl.pathname.includes(locale))
  ) {
    const newUrl = new URL(request.nextUrl.pathname, request.nextUrl.origin);
    newUrl.pathname = `/${routing.defaultLocale}${request.nextUrl.pathname}`;
    console.log("[Middleware] Redirecting to new url:", newUrl);
    return NextResponse.redirect(newUrl);
  }

  const intlResponse = intlMiddleware(request);

  // If intl middleware returns a response (redirect), use it
  if (intlResponse) {
    return intlResponse;
  }

  // Extract locale from the pathname
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  // Check if the current path is a public route (auth pages)
  const publicRoutes = [
    `/${locale}/login`,
    `/${locale}/signup`,
    `/${locale}/forgot-password`,
    `/${locale}/reset-password`,
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Skip auth check for public routes
  if (isPublicRoute) {
    console.log("[Middleware] Public route, skipping auth check");
    return NextResponse.next();
  }

  // Apply authentication logic for protected routes
  const token = request.cookies.get("accessToken");

  console.log("[Middleware] Token:", token);

  if (!token?.value) {
    console.log("[Middleware] No access token found, redirecting to login");
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  try {
    console.log("[Middleware] Validating access token");
    await getMe(token?.value);
    console.log("[Middleware] Token validation successful");
  } catch {
    console.log("[Middleware] Token validation failed, redirecting to login");
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  console.log("[Middleware] Request authorized, proceeding");
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except:
    // - API routes (starting with /api/)
    // - Static files (_next/static)
    // - Build artifacts (_next/*)
    // - Favicon and other public files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
