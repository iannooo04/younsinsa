
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/member/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.level = (user as any).level;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                (session.user as any).level = token.level;
            }
            return session;
        },
    },
    providers: [], // Providers are configured in auth.ts
    session: { strategy: "jwt" },
} satisfies NextAuthConfig;
