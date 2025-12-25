// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload, type JWTVerifyOptions } from "jose";
import createIntlMiddleware from "next-intl/middleware";

// ---- i18n 설정 ----
const LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
type AppLocale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: AppLocale = "ko";
const LOCALE_SET = new Set<string>(LOCALES as readonly string[]);

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: false,
});

// ---- 인증/접근 제어 설정 ----
const COOKIE = process.env.JWT_COOKIE_NAME || "globx_bot";
const MAX_NEXT_LEN = 2048;

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET 환경변수가 없거나 너무 짧습니다(>=16).");
  }
  return new TextEncoder().encode(secret);
}

const VERIFY_OPTS: JWTVerifyOptions = {
  algorithms: ["HS256"],
  ...(process.env.JWT_ISSUER ? { issuer: process.env.JWT_ISSUER } : {}),
  ...(process.env.JWT_AUDIENCE ? { audience: process.env.JWT_AUDIENCE } : {}),
};

type HostKind = "site" | "member" | "admin";

function classifyHost(host: string): HostKind {
  if (host.startsWith("member.")) return "member";
  if (host.startsWith("admin.")) return "admin";
  return "site";
}

function isLocaleSegment(seg: string): seg is AppLocale {
  return LOCALE_SET.has(seg);
}

function stripLocalePrefixFromPath(pathname: string): {
  locale: AppLocale;
  nakedPath: string;
} {
  const parts = pathname.split("/");
  const first = parts[1] ?? "";
  if (isLocaleSegment(first)) {
    const naked = "/" + parts.slice(2).join("/");
    return { locale: first, nakedPath: naked === "//" ? "/" : naked };
  }
  return { locale: DEFAULT_LOCALE, nakedPath: pathname };
}

function ensureLocalePrefix(pathname: string, locale: AppLocale): string {
  const parts = pathname.split("/");
  const first = parts[1] ?? "";
  if (isLocaleSegment(first)) return pathname;
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

function ensureNamespacePath(
  hostKind: Exclude<HostKind, "site">,
  pathnameAfterLocale: string
): string {
  // pathnameAfterLocale 예: "/", "/login", "/orders"
  const ns = hostKind === "member" ? "/member" : "/admin";
  if (pathnameAfterLocale.startsWith(ns)) return pathnameAfterLocale;
  return `${ns}${pathnameAfterLocale === "/" ? "" : pathnameAfterLocale}`;
}

function mapHostToInternalPath(
  hostKind: HostKind,
  pathname: string
): { finalPathname: string; locale: AppLocale; needsRewrite: boolean } {
  if (hostKind === "site") {
    const { locale } = stripLocalePrefixFromPath(pathname);
    return { finalPathname: pathname, locale, needsRewrite: false };
  }

  // member/admin: 외부 URL은 /login, /orders 등으로 들어오고
  // 내부는 /{locale}/{member|admin}/... 로 rewrite
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0] ?? "";
  const hasLocale = isLocaleSegment(first);
  const locale = hasLocale ? (first as AppLocale) : DEFAULT_LOCALE;

  const restParts = hasLocale ? parts.slice(1) : parts;
  const restPath = "/" + restParts.join("/");
  const afterLocale = restParts.length === 0 ? "/" : restPath;

  const namespaced = ensureNamespacePath(hostKind, afterLocale);
  const withLocale = ensureLocalePrefix(namespaced, locale);

  return {
    finalPathname: withLocale,
    locale,
    needsRewrite: withLocale !== pathname,
  };
}

// 로케일 prefix를 제거한 경로를 기준으로 공개 여부 판단
const PUBLIC_PATHS: RegExp[] = [
  /^\/$/,
  /^\/home(?:\/.*)?$/,
  /^\/header(?:\/.*)?$/,
  /^\/footer(?:\/.*)?$/,
  /^\/notice(?:\/.*)?$/,
  /^\/popup(?:\/.*)?$/,

  // ✅ 로그인 없이 열려야 하는 페이지
  /^\/main\/recommend(?:\/.*)?$/,

  // site 내부 로그인/회원(호환)
  /^\/auth\/login(?:\/.*)?$/,
  /^\/auth\/signup(?:\/.*)?$/,

  // 네임스페이스
  /^\/member\/login(?:\/.*)?$/,
  /^\/member\/signup(?:\/.*)?$/,
  /^\/admin\/login(?:\/.*)?$/,

  // 공개 API
  /^\/api\/account(?:\/.*)?$/,
  /^\/api\/header(?:\/.*)?$/,
  /^\/api\/footer(?:\/.*)?$/,
  /^\/api\/notice(?:\/.*)?$/,
  /^\/api\/popup(?:\/.*)?$/,
  /^\/api\/main\/recommend(?:\/.*)?$/,

  // auth API
  /^\/api\/auth\/login(?:\/.*)?$/,
  /^\/api\/auth\/logout(?:\/.*)?$/,
  /^\/api\/auth\/signup(?:\/.*)?$/,
];

function isPublic(pathname: string): boolean {
  const { nakedPath } = stripLocalePrefixFromPath(pathname);
  return PUBLIC_PATHS.some((re) => re.test(nakedPath));
}

interface AuthPayload extends JWTPayload {
  userId?: string;
  email?: string;
  level?: number | string;
}

function extractLevelString(payload: AuthPayload): string {
  const v = payload.level;
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : 0;
  return Number.isFinite(n) ? String(n) : "0";
}

type ResponseMode = { kind: "next" } | { kind: "rewrite"; pathname: string };

function buildResponse(
  req: NextRequest,
  extra: Record<string, string>,
  mode: ResponseMode
): NextResponse {
  const requestHeaders = new Headers(req.headers);
  for (const [k, v] of Object.entries(extra)) {
    requestHeaders.set(k, v);
  }

  if (mode.kind === "rewrite") {
    const url = new URL(req.url);
    url.pathname = mode.pathname;
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

function setUserHeaders(
  req: NextRequest,
  payload: AuthPayload,
  locale: AppLocale,
  mode: ResponseMode
): NextResponse {
  const userId =
    (typeof payload.userId === "string" && payload.userId) ||
    (typeof payload.sub === "string" && payload.sub) ||
    "";

  if (!userId) {
    const res = buildResponse(req, { "x-next-intl-locale": locale }, mode);
    if (process.env.NODE_ENV !== "production") {
      res.headers.set("x-debug-user-level", "0");
      res.headers.set("x-debug-locale", locale);
    }
    return res;
  }

  const email = typeof payload.email === "string" ? payload.email : "";
  const levelStr = extractLevelString(payload);

  const extra: Record<string, string> = {
    "x-user-id": userId,
    "x-user-level": levelStr,
    "x-next-intl-locale": locale,
  };
  if (email) extra["x-user-email"] = email;
  if (typeof payload.jti === "string") extra["x-session-jti"] = payload.jti;

  const res = buildResponse(req, extra, mode);
  if (process.env.NODE_ENV !== "production") {
    res.headers.set("x-debug-user-level", levelStr);
    res.headers.set("x-debug-locale", locale);
  }
  return res;
}

async function attachUserIfValid(
  req: NextRequest,
  locale: AppLocale,
  mode: ResponseMode
): Promise<NextResponse> {
  const token = req.cookies.get(COOKIE)?.value;

  if (!token) {
    const res = buildResponse(req, { "x-next-intl-locale": locale }, mode);
    if (process.env.NODE_ENV !== "production") {
      res.headers.set("x-debug-locale", locale);
    }
    return res;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret(), VERIFY_OPTS);
    return setUserHeaders(req, payload as AuthPayload, locale, mode);
  } catch {
    const res = buildResponse(req, { "x-next-intl-locale": locale }, mode);
    if (process.env.NODE_ENV !== "production") {
      res.headers.set("x-debug-locale", locale);
    }
    return res;
  }
}

function getNextParam(req: NextRequest, fallback: string = "/"): string {
  try {
    const u = new URL(req.url);
    const next = u.searchParams.get("next");
    if (!next) return fallback;
    if (!next.startsWith("/") || next.startsWith("//")) return fallback;
    if (next.length > MAX_NEXT_LEN) return fallback;
    return next;
  } catch {
    return fallback;
  }
}

function withLocalePrefix(path: string, locale: AppLocale): string {
  const parts = path.split("/");
  const first = parts[1] ?? "";
  const hasLocale = LOCALE_SET.has(first);
  return hasLocale ? path : `/${locale}${path === "/" ? "" : path}`;
}

function getLoginPath(hostKind: HostKind, locale: AppLocale): string {
  // site: /{locale}/member/login (내부 네임스페이스)
  if (hostKind === "site") return `/${locale}/member/login`;

  // member/admin 서브도메인: 외부는 /{locale}/login (짧게 유지)
  return `/${locale}/login`;
}

function isLoginPathVisible(hostKind: HostKind, pathname: string): boolean {
  const { nakedPath } = stripLocalePrefixFromPath(pathname);

  if (hostKind === "site") {
    return (
      nakedPath.startsWith("/member/login") ||
      nakedPath.startsWith("/auth/login")
    );
  }

  // member/admin: 외부에서는 /login (내부는 rewrite됨)
  return nakedPath === "/login" || nakedPath.startsWith("/login/");
}

function redirectOr401(
  req: NextRequest,
  hostKind: HostKind,
  locale: AppLocale
): NextResponse {
  const isApi = req.nextUrl.pathname.startsWith("/api/");
  if (isApi) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  let nextTarget = req.nextUrl.pathname + req.nextUrl.search;

  // 로그인 페이지로 가려다 다시 로그인으로 튕기는 루프 방지
  if (isLoginPathVisible(hostKind, req.nextUrl.pathname)) {
    nextTarget = "/";
  } else {
    try {
      const u = new URL(req.url);
      const existing = u.searchParams.get("next");
      if (existing) nextTarget = existing;
    } catch {
      /* noop */
    }
  }

  if (nextTarget.length > MAX_NEXT_LEN) nextTarget = "/";

  const loginPath = getLoginPath(hostKind, locale);
  const login = new URL(loginPath, req.url);
  login.searchParams.set("next", nextTarget);

  return NextResponse.redirect(login);
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const host = req.headers.get("host") ?? "";
  const hostKind = classifyHost(host);

  const originalPathname = req.nextUrl.pathname;

  // 정적/내부는 matcher에서 대부분 제외되지만, 안전망
  if (
    originalPathname.startsWith("/_next") ||
    originalPathname === "/favicon.ico" ||
    originalPathname === "/robots.txt" ||
    originalPathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // (0) host(member/admin) → 내부 경로로 매핑 (locale + namespace 강제)
  const mapped = mapHostToInternalPath(hostKind, originalPathname);

  // (A) 로케일 프리픽스가 붙은 API를 `/api/**`로 rewrite
  const localeGroup = (LOCALES as readonly string[]).join("|");
  const apiLocaleMatch = mapped.finalPathname.match(
    new RegExp(`^\\/(${localeGroup})\\/api\\/(.+)$`)
  );

  const finalPathnameForApp = apiLocaleMatch
    ? `/api/${apiLocaleMatch[2]}`
    : mapped.finalPathname;

  const needsRewrite =
    apiLocaleMatch !== null || (hostKind !== "site" && mapped.needsRewrite);

  const mode: ResponseMode = needsRewrite
    ? { kind: "rewrite", pathname: finalPathnameForApp }
    : { kind: "next" };

  // (B) API 경로는 i18n 미들웨어 건너뛰고 인증만 처리
  if (finalPathnameForApp.startsWith("/api/")) {
    if (isPublic(finalPathnameForApp)) {
      return attachUserIfValid(req, mapped.locale, mode);
    }

    const token = req.cookies.get(COOKIE)?.value;
    if (!token) return redirectOr401(req, hostKind, mapped.locale);

    try {
      const { payload } = await jwtVerify(token, getSecret(), VERIFY_OPTS);
      return setUserHeaders(req, payload as AuthPayload, mapped.locale, mode);
    } catch {
      return redirectOr401(req, hostKind, mapped.locale);
    }
  }

  // (C) site 도메인만 next-intl middleware 적용 (member/admin은 host rewrite가 우선)
  if (hostKind === "site") {
    const intlRes = intlMiddleware(req);
    const hasRedirect = intlRes.headers.has("location");
    const hasRewrite = intlRes.headers.has("x-middleware-rewrite");
    if (hasRedirect || hasRewrite) {
      return intlRes;
    }
  }

  // (D) 로그인 경로: 유효 토큰이면 next로 즉시 리다이렉트(로케일 보존)
  if (isLoginPathVisible(hostKind, finalPathnameForApp)) {
    const { locale } = stripLocalePrefixFromPath(finalPathnameForApp);

    const token = req.cookies.get(COOKIE)?.value;
    if (!token) return attachUserIfValid(req, locale, mode);

    try {
      const { payload } = await jwtVerify(token, getSecret(), VERIFY_OPTS);
      const nextTarget = getNextParam(req, "/");
      const localized = withLocalePrefix(nextTarget, locale);
      const res = NextResponse.redirect(new URL(localized, req.url));
      if (process.env.NODE_ENV !== "production") {
        res.headers.set(
          "x-debug-user-level",
          extractLevelString(payload as AuthPayload)
        );
        res.headers.set("x-debug-locale", locale);
      }
      return res;
    } catch {
      return attachUserIfValid(req, locale, mode);
    }
  }

  // (E) 공개 페이지 → 소프트 인증 (main/recommend 포함)
  if (isPublic(finalPathnameForApp)) {
    const { locale } = stripLocalePrefixFromPath(finalPathnameForApp);
    return attachUserIfValid(req, locale, mode);
  }

  // (F) 보호 페이지 → 강제 인증
  const { locale } = stripLocalePrefixFromPath(finalPathnameForApp);

  const token = req.cookies.get(COOKIE)?.value;
  if (!token) return redirectOr401(req, hostKind, locale);

  try {
    const { payload } = await jwtVerify(token, getSecret(), VERIFY_OPTS);
    return setUserHeaders(req, payload as AuthPayload, locale, mode);
  } catch {
    return redirectOr401(req, hostKind, locale);
  }
}

// ✅ 정적 자산/확장자 제외
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
