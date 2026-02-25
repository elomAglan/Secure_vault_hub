import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = new Set([
  "/",
  "/pricing",
  "/features",
  "/docs",
  "/contact",
  "/changelog",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/invite/accept",
  "/auth/oauth/callback",
]);

const PROTECTED_PREFIXES = ["/dashboard", "/overview", "/first_app", "/auth/profile"];

const AUTH_PAGES = new Set(["/auth/login", "/auth/signup"]);

const isProtectedPath = (pathname: string) =>
  PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const isPublicPath = (pathname: string) => {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return ["/pricing", "/features", "/docs", "/contact", "/changelog", "/invite"].some((prefix) =>
    pathname.startsWith(`${prefix}/`)
  );
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
};

const isJwtNotExpired = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) return true;

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as { exp?: number };
    if (typeof payload.exp !== "number") return true;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const hasValidToken = (token: string | undefined) =>
  Boolean(
    token &&
      token.trim() &&
      token !== "undefined" &&
      token !== "null" &&
      isJwtNotExpired(token)
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = hasValidToken(accessToken);

  if (isProtectedPath(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && AUTH_PAGES.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath(pathname) && !isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
