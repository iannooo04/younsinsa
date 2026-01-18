"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";

export async function logoutAction() {
    // 1. NextAuth(Auth.js) 로그아웃 시도
    try {
        await signOut({ redirect: false });
    } catch (error) {
        console.error("Logout error (ignored):", error);
    }

    // 2. 쿠키 강제 삭제 (더 강력하게 처리)
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    // 지워야 할 쿠키 이름 패턴들
    const targetCookies = allCookies.filter(cookie => 
        cookie.name.includes("authjs") || 
        cookie.name.includes("next-auth") ||
        cookie.name.includes("session") ||
        cookie.name.includes("csrf")
    );

    targetCookies.forEach((cookie) => {
        // 기본 삭제
        cookieStore.delete(cookie.name);
        
        // Path 명시 삭제 (하위 경로 문제 방지)
        cookieStore.set(cookie.name, "", { maxAge: 0, path: '/' });
        
        // Secure 옵션 고려한 삭제 (프로덕션 환경 등)
        cookieStore.set(cookie.name, "", { maxAge: 0, path: '/', secure: true });

        // Domain이 .nkbus.com 일 수도 있으므로 도메인 명시 시도
        try {
            cookieStore.set(cookie.name, "", { maxAge: 0, path: '/', domain: '.nkbus.com' });
            cookieStore.set(cookie.name, "", { maxAge: 0, path: '/', domain: 'nkbus.com' });
        } catch {} // 로컬호스트 등에서 도메인 설정 실패 시 무시
    });
}
