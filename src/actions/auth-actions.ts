"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";

export async function logoutAction() {
    // 1. NextAuth(Auth.js) 로그아웃 시도 (서버 사이드)
    // redirect: false를 사용하여 서버 사이드에서 자동 리다이렉트를 막고,
    // 클라이언트에서 제어할 수 있도록 함.
    try {
        await signOut({ redirect: false });
    } catch (error) {
        // signOut은 내부적으로 리다이렉트 에러를 던질 수 있음.
        // 하지만 redirect: false 옵션이 동작한다면 에러 없이 진행될 것임.
        // 만약 에러가 발생해도 쿠키 삭제를 강제 진행.
        console.error("Logout error (ignored):", error);
    }

    // 2. 쿠키 강제 삭제 (혹시 signOut이 실패하거나 쿠키를 제대로 못 지우는 경우 대비)
    // 가능한 모든 세션 토큰 이름에 대해 삭제 시도
    const cookieStore = await cookies();
    
    const cookieNames = [
        "authjs.session-token",
        "__Secure-authjs.session-token",
        "next-auth.session-token",
        "__Secure-next-auth.session-token",
        "authjs.csrf-token",
        "__Host-authjs.csrf-token",
        "__Secure-authjs.callback-url",
        "next-auth.callback-url",
        "__Secure-next-auth.callback-url"
    ];

    cookieNames.forEach((name) => {
        cookieStore.delete(name);
    });
}
