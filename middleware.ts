import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const LOCALES = ["ko", "en", "ja", "zh", "vi"] as const;
const DEFAULT_LOCALE = "ko";

const intlMiddleware = createIntlMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "always",
    localeDetection: false,
});

// 공개 경로 패턴 (로그인 없이 접근 가능)
/* eslint-disable @typescript-eslint/no-unused-vars */
const PUBLIC_PATHS = [
    /^\/$/,
    /^\/(?:ko|en|ja|zh|vi)\/?$/,
    /^\/(?:ko|en|ja|zh|vi)\/home(?:\/.*)?$/,
    /^\/(?:ko|en|ja|zh|vi)\/member\/login(?:\/.*)?$/,
    /^\/(?:ko|en|ja|zh|vi)\/member\/join(?:\/.*)?$/,
    /^\/features\/event(?:\/.*)?$/,
    /^\/features\/proxy(?:\/.*)?$/,
    // ✅ [신규] 팝업 카테고리 데이터 API
    /^\/api\/popup\/categories(?:\/.*)?$/,
    /^\/api\/auth(?:\/.*)?$/, // NextAuth API
];
/* eslint-enable @typescript-eslint/no-unused-vars */

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // 1. i18n 미들웨어 적용
    const response = intlMiddleware(req);

    // 2. 보호된 경로 접근 제어 (mypage, cart, like)
    const protectedPaths = [
        /^\/(?:ko|en|ja|zh|vi)\/mypage(?:\/.*)?$/,
        /^\/(?:ko|en|ja|zh|vi)\/orders\/cart(?:\/.*)?$/,
        /^\/(?:ko|en|ja|zh|vi)\/like(?:\/.*)?$/,
    ];

    const isProtected = protectedPaths.some((pattern) => pattern.test(nextUrl.pathname));

    if (isProtected && !isLoggedIn) {
        const locale = nextUrl.pathname.split("/")[1] || DEFAULT_LOCALE;
        const loginUrl = new URL(`/${locale}/member/login`, req.url);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);
        return NextResponse.redirect(loginUrl);
    }

    // 3. 인증 정보 헤더 추가 (호환성 유지)
    if (isLoggedIn && req.auth?.user) {
        const user = req.auth.user as { id?: string; level?: string | number; email?: string };
        response.headers.set("x-user-id", user.id || "");
        response.headers.set("x-user-level", String(user.level || 1));
        response.headers.set("x-user-email", user.email || "");
    }

    return response;
});

export const config = {
    // matcher에서 정적 파일 및 특정 경로 제외
    matcher: ["/((?!api/auth|api/images|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
