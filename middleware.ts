import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "@/services/auth/auth.service";
import { routing } from "./src/i18n/routing";

// Create i18n middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  if (
    !routing.locales.some((locale) => request.nextUrl.pathname.includes(locale))
  ) {
    const newUrl = new URL(request.nextUrl.pathname, request.nextUrl.origin);
    newUrl.pathname = `/${routing.defaultLocale}${request.nextUrl.pathname}`;
    console.log("[Middleware] Redirecting to new url:", newUrl);
    return NextResponse.redirect(newUrl);
  }

  const intlResponse = intlMiddleware(request);

  if (intlResponse) {
    return intlResponse;
  }

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  const publicRoutes = [
    `/${locale}/login`,
    `/${locale}/signup`,
    `/${locale}/forgot-password`,
    `/${locale}/reset-password`,
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken");
  const clientToken = request.cookies.get("clientAccessToken");

  if (request.nextUrl.pathname.includes(`${locale}/client`)) {
    if (!clientToken?.value) {
      return NextResponse.redirect(
        new URL(`/${locale}/client/login`, request.url)
      );
    }
  }

  if (!token?.value) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  try {
    await getMe(token?.value);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

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
